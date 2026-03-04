import { useEffect, useState } from 'react';
import { MapPin, Search, Filter, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';
import { supabase } from './lib/supabase';
import { StateCard } from './components/StateCard';
import { StateDetailModal } from './components/StateDetailModal';
import { SalaryCalculator } from './components/SalaryCalculator';
import type { StateWithData } from './lib/types';

function App() {
  const [states, setStates] = useState<StateWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<StateWithData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'cost' | 'unemployment'>('cost');

  useEffect(() => {
    loadStates();
  }, []);

  async function loadStates() {
    try {
      const { data, error } = await supabase
        .from('states')
        .select(`
          *,
          cost_of_living(*),
          employment_stats(*)
        `)
        .order('name');

      if (error) throw error;
      setStates(data as StateWithData[]);
    } catch (error) {
      console.error('Error loading states:', error);
    } finally {
      setLoading(false);
    }
  }

  const regions = ['all', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  const filteredStates = states
    .filter(state => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           state.uf.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'all' || state.region === regionFilter;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'cost') {
        const costA = a.cost_of_living[0]?.total_monthly || 0;
        const costB = b.cost_of_living[0]?.total_monthly || 0;
        return costB - costA;
      }
      if (sortBy === 'unemployment') {
        const rateA = a.employment_stats[0]?.unemployment_rate || 0;
        const rateB = b.employment_stats[0]?.unemployment_rate || 0;
        return rateA - rateB;
      }
      return 0;
    });

  const totalPopulation = states.reduce((sum, state) => sum + state.population, 0);
  const avgCost = states.reduce((sum, state) => sum + (state.cost_of_living[0]?.total_monthly || 0), 0) / states.length;
  const avgUnemployment = states.reduce((sum, state) => sum + (state.employment_stats[0]?.unemployment_rate || 0), 0) / states.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Custo de Vida no Brasil</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Compare custos de vida e oportunidades de emprego em todos os estados brasileiros
          </p>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Custo Médio Nacional</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgCost)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Desemprego Médio</p>
                    <p className="text-2xl font-bold text-gray-900">{avgUnemployment.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">População Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat('pt-BR').format(totalPopulation)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar estado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>
                        {region === 'all' ? 'Todas as regiões' : region}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="cost">Ordenar por custo</option>
                    <option value="unemployment">Ordenar por emprego</option>
                    <option value="name">Ordenar por nome</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStates.map((state) => (
                <StateCard
                  key={state.id}
                  state={state}
                  onClick={() => setSelectedState(state)}
                />
              ))}
            </div>

            {filteredStates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum estado encontrado</p>
              </div>
            )}
          </div>

          {selectedState && (
            <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto">
              <div className="w-full max-w-6xl my-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <StateDetailModal
                      state={selectedState}
                      onClose={() => setSelectedState(null)}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <SalaryCalculator
                      minimumSalary={selectedState.cost_of_living[0]?.minimum_salary_needed || 0}
                      averageSalary={selectedState.employment_stats[0]?.average_salary || 0}
                      stateName={selectedState.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
