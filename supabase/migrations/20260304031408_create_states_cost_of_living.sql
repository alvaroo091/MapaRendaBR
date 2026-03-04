-- Brazilian States Cost of Living Database
--
-- 1. New Tables
--    - states: Brazilian states basic information
--    - cost_of_living: Cost breakdown by category for each state
--    - employment_stats: Employment and salary statistics
--
-- 2. Security
--    - Enable RLS on all tables
--    - Add policies for public read access

CREATE TABLE IF NOT EXISTS states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  uf text UNIQUE NOT NULL,
  region text NOT NULL,
  population integer DEFAULT 0,
  area_km2 numeric DEFAULT 0,
  gdp_per_capita numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cost_of_living (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id uuid REFERENCES states(id) ON DELETE CASCADE,
  housing_avg numeric DEFAULT 0,
  food_avg numeric DEFAULT 0,
  transport_avg numeric DEFAULT 0,
  healthcare_avg numeric DEFAULT 0,
  education_avg numeric DEFAULT 0,
  utilities_avg numeric DEFAULT 0,
  entertainment_avg numeric DEFAULT 0,
  total_monthly numeric DEFAULT 0,
  minimum_salary_needed numeric DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employment_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id uuid REFERENCES states(id) ON DELETE CASCADE,
  unemployment_rate numeric DEFAULT 0,
  average_salary numeric DEFAULT 0,
  job_openings integer DEFAULT 0,
  main_industries text[] DEFAULT '{}',
  last_updated timestamptz DEFAULT now()
);

ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_of_living ENABLE ROW LEVEL SECURITY;
ALTER TABLE employment_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view states"
  ON states FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view cost of living"
  ON cost_of_living FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view employment stats"
  ON employment_stats FOR SELECT
  TO anon
  USING (true);