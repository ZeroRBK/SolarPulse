# backend/etl/ember_yearly_global.py

import pandas as pd
import os
from dotenv import load_dotenv
from shared.db import get_db_connection, upsert_dataframe

# Load env vars from root .env file
load_dotenv()

# Constants
CSV_PATH = os.path.join(os.path.dirname(__file__), "../data/yearly_full_release_long_format.csv")
TABLE_NAME = "electricity_data"  # Your target table in Supabase

# Required columns to keep
COLUMNS_TO_KEEP = [
    "country", "iso_code", "year", "source", "category",
    "generation_gwh", "generation_twh", "generation_percent"
]

def run():
    print("🔄 Starting ETL: Ember Yearly Global")

    # Read CSV
    df = pd.read_csv(CSV_PATH)
    print(f"✅ CSV Loaded: {len(df)} rows")

    # Clean and filter
    df = df[COLUMNS_TO_KEEP].dropna(subset=["generation_gwh"])
    df["year"] = df["year"].astype(int)
    print(f"🧹 Cleaned Data: {len(df)} rows")

    # Load to DB
    conn = get_db_connection()
    upsert_dataframe(df, conn, TABLE_NAME)
    conn.close()

    print("✅ ETL complete.")


if __name__ == "__main__":
    run()
