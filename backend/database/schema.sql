CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name TEXT,
  code TEXT UNIQUE
);

CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name TEXT,
  code TEXT,
  country_id INTEGER REFERENCES countries(id)
);

CREATE TABLE energy_sources (
  id SERIAL PRIMARY KEY,
  name TEXT,
  category TEXT
);

CREATE TABLE electricity_data (
  id SERIAL PRIMARY KEY,
  country_id INTEGER REFERENCES countries(id),
  state_id INTEGER REFERENCES states(id),
  date DATE,
  category TEXT,
  subcategory TEXT,
  variable TEXT,
  unit TEXT,
  value NUMERIC,
  data_source TEXT
);
