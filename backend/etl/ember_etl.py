import pandas as pd
import psycopg2
from datetime import datetime
import os
from typing import Dict, Optional

class EmberETL:
    def __init__(self, supabase_url: str, supabase_key: str, db_password: str):
        """Initialize ETL with Supabase connection details"""
        # Extract connection details from Supabase URL
        # Format: postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
        self.connection_params = {
            'host': 'db.xxx.supabase.co',  # Replace with your actual host
            'database': 'postgres',
            'user': 'postgres',
            'password': db_password,
            'port': 5432
        }
        
    def connect_db(self):
        """Create database connection"""
        try:
            conn = psycopg2.connect(**self.connection_params)
            return conn
        except Exception as e:
            print(f"Database connection failed: {e}")
            return None
    
    def setup_lookup_tables(self):
        """Populate countries and states tables"""
        conn = self.connect_db()
        if not conn:
            return
            
        cursor = conn.cursor()
        
        try:
            # Insert USA
            cursor.execute("""
                INSERT INTO countries (name, code) 
                VALUES ('United States of America', 'USA')
                ON CONFLICT (code) DO NOTHING
            """)
            
            # Get USA country_id
            cursor.execute("SELECT id FROM countries WHERE code = 'USA'")
            usa_id = cursor.fetchone()[0]
            
            # US States (sample - you'd want all 50)
            states = [
                ('Alabama', 'AL'), ('Alaska', 'AK'), ('Arizona', 'AZ'),
                ('Texas', 'TX'), ('California', 'CA'), ('Florida', 'FL'),
                # Add all states here...
            ]
            
            for state_name, state_code in states:
                cursor.execute("""
                    INSERT INTO states (name, code, country_id)
                    VALUES (%s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (state_name, state_code, usa_id))
            
            conn.commit()
            print("✅ Lookup tables populated")
            
        except Exception as e:
            print(f"❌ Error setting up lookup tables: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    def load_lookup_caches(self, cursor) -> Dict:
        """Load all country and state mappings into memory once"""
        
        # Load countries
        cursor.execute("SELECT code, id FROM countries")
        country_cache = {code: id for code, id in cursor.fetchall()}
        
        # Load states  
        cursor.execute("SELECT code, id FROM states")
        state_cache = {code: id for code, id in cursor.fetchall()}
        
        return {
            'countries': country_cache,
            'states': state_cache
        }
    
    def process_ember_csv(self, csv_file_path: str, data_source: str = "ember_us_states"):
        """Process Ember CSV and insert into database"""
        
        print(f"📊 Processing: {csv_file_path}")
        
        # Read CSV
        try:
            df = pd.read_csv(csv_file_path)
            print(f"📈 Loaded {len(df)} rows")
        except Exception as e:
            print(f"❌ Error reading CSV: {e}")
            return
        
        conn = self.connect_db()
        if not conn:
            return
            
        cursor = conn.cursor()
        
        try:
            # Load lookup tables into memory ONCE
            print("🔄 Loading lookup caches...")
            caches = self.load_lookup_caches(cursor)
            
            # Prepare batch insert for better performance
            insert_query = """
                INSERT INTO electricity_data 
                (country_id, state_id, date, category, subcategory, variable, unit, value, data_source, frequency)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            batch_data = []
            successful_inserts = 0
            errors = 0
            batch_size = 1000
            
            # Determine frequency based on data source
            frequency = 'monthly' if 'monthly' in data_source.lower() else 'annual'
            
            for index, row in df.iterrows():
                try:
                    # Parse date (format: "1/1/2001" -> "2001-01-01")
                    date_parts = row['Date'].split('/')
                    parsed_date = f"{date_parts[2]}-{date_parts[0]:0>2}-{date_parts[1]:0>2}"
                    
                    # Get foreign key IDs from cache (no DB calls!)
                    country_id = caches['countries'].get(row['Country code'])
                    state_id = caches['states'].get(row['State code']) if pd.notna(row['State code']) else None
                    
                    # Prepare data tuple
                    data_tuple = (
                        country_id,
                        state_id, 
                        parsed_date,
                        row['Category'],
                        row['Subcategory'],
                        row['Variable'],
                        row['Unit'],
                        float(row['Value']) if pd.notna(row['Value']) else None,
                        data_source,
                        frequency
                    )
                    
                    batch_data.append(data_tuple)
                    
                    # Execute batch when it reaches batch_size
                    if len(batch_data) >= batch_size:
                        cursor.executemany(insert_query, batch_data)
                        conn.commit()
                        successful_inserts += len(batch_data)
                        print(f"💾 Committed batch: {successful_inserts} total rows...")
                        batch_data = []  # Reset batch
                        
                except Exception as e:
                    errors += 1
                    print(f"❌ Error processing row {index}: {e}")
                    if errors > 10:  # Stop if too many errors
                        print("Too many errors, stopping...")
                        break
            
            # Insert any remaining data in the final batch
            if batch_data:
                cursor.executemany(insert_query, batch_data)
                conn.commit()
                successful_inserts += len(batch_data)
            
            print(f"✅ Successfully inserted {successful_inserts} rows")
            print(f"⚠️  {errors} errors encountered")
            
        except Exception as e:
            print(f"❌ Processing failed: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    def validate_data(self):
        """Run some basic validation queries"""
        conn = self.connect_db()
        cursor = conn.cursor()
        
        print("\n🔍 Data Validation:")
        
        # Total rows
        cursor.execute("SELECT COUNT(*) FROM electricity_data")
        total_rows = cursor.fetchone()[0]
        print(f"📊 Total rows: {total_rows:,}")
        
        # Date range
        cursor.execute("SELECT MIN(date), MAX(date) FROM electricity_data")
        min_date, max_date = cursor.fetchone()
        print(f"📅 Date range: {min_date} to {max_date}")
        
        # Sample solar data for Texas
        cursor.execute("""
            SELECT ed.date, ed.variable, ed.value, ed.unit
            FROM electricity_data ed
            JOIN states s ON ed.state_id = s.id
            WHERE s.code = 'TX' 
            AND ed.variable = 'Solar'
            AND ed.category = 'Electricity generation'
            ORDER BY ed.date DESC
            LIMIT 5
        """)
        
        print("\n🌞 Recent Texas Solar Generation:")
        for row in cursor.fetchall():
            print(f"  {row[0]}: {row[2]} {row[3]}")
        
        cursor.close()
        conn.close()

# Usage example
if __name__ == "__main__":
    # Initialize ETL
    etl = EmberETL(
        supabase_url="your-supabase-url",
        supabase_key="your-supabase-key", 
        db_password="your-database-password"
    )
    
    # Set up lookup tables first
    etl.setup_lookup_tables()
    
    # Process the CSV file
    csv_path = "ember_us_states_monthly.csv"  # Path to your downloaded CSV
    etl.process_ember_csv(csv_path, "ember_us_states_monthly")
    
    # Validate the results
    etl.validate_data()

# Requirements.txt should include:
# pandas
# psycopg2-binary
# python-dotenv (for environment variables)