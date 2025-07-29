# backend/etl/shared/db.py

import psycopg2
import os
import pandas as pd

def get_db_connection():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise Exception("DATABASE_URL not set in .env")
    return psycopg2.connect(db_url)

def upsert_dataframe(df: pd.DataFrame, conn, table_name: str):
    cursor = conn.cursor()
    # Simple overwrite strategy — you can change to UPSERT if needed
    cursor.execute(f"DELETE FROM {table_name};")  # truncate for now
    conn.commit()

    # Bulk insert using COPY
    from io import StringIO
    buffer = StringIO()
    df.to_csv(buffer, index=False, header=False)
    buffer.seek(0)

    columns = ", ".join(df.columns)
    cursor.copy_expert(f"COPY {table_name} ({columns}) FROM STDIN WITH CSV", buffer)
    conn.commit()
    cursor.close()
