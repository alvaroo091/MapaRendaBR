export interface Database {
  public: {
    Tables: {
      states: {
        Row: State;
        Insert: Omit<State, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<State, 'id' | 'created_at' | 'updated_at'>>;
      };
      cost_of_living: {
        Row: CostOfLiving;
        Insert: Omit<CostOfLiving, 'id' | 'last_updated'>;
        Update: Partial<Omit<CostOfLiving, 'id' | 'last_updated'>>;
      };
      employment_stats: {
        Row: EmploymentStats;
        Insert: Omit<EmploymentStats, 'id' | 'last_updated'>;
        Update: Partial<Omit<EmploymentStats, 'id' | 'last_updated'>>;
      };
    };
  };
}

export interface State {
  id: string;
  name: string;
  uf: string;
  region: string;
  population: number;
  area_km2: number;
  gdp_per_capita: number;
  created_at: string;
  updated_at: string;
}

export interface CostOfLiving {
  id: string;
  state_id: string;
  housing_avg: number;
  food_avg: number;
  transport_avg: number;
  healthcare_avg: number;
  education_avg: number;
  utilities_avg: number;
  entertainment_avg: number;
  total_monthly: number;
  minimum_salary_needed: number;
  last_updated: string;
}

export interface EmploymentStats {
  id: string;
  state_id: string;
  unemployment_rate: number;
  average_salary: number;
  job_openings: number;
  main_industries: string[];
  last_updated: string;
}

export interface StateWithData extends State {
  cost_of_living: CostOfLiving[];
  employment_stats: EmploymentStats[];
}
