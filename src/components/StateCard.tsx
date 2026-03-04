import { MapPin, TrendingUp, Users, Briefcase, Home, ShoppingCart } from 'lucide-react';
import type { StateWithData } from '../lib/types';

interface StateCardProps {
  state: StateWithData;
  onClick: () => void;
}

export function StateCard({ state, onClick }: StateCardProps) {
  const cost = state.cost_of_living[0];
  const employment = state.employment_stats[0];

  const getUnemploymentColor = (rate: number) => {
    if (rate < 7) return 'text-green-600';
    if (rate < 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-400 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">{state.name}</h3>
            <p className="text-blue-100 text-sm">{state.region}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-1">
            <span className="text-xl font-bold">{state.uf}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Custo Mensal</p>
              <p className="font-bold text-gray-800">{formatCurrency(cost?.total_monthly || 0)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Salário Mínimo</p>
              <p className="font-bold text-gray-800">{formatCurrency(cost?.minimum_salary_needed || 0)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Briefcase className={`w-5 h-5 ${getUnemploymentColor(employment?.unemployment_rate || 0)}`} />
            <div>
              <p className="text-xs text-gray-500">Desemprego</p>
              <p className="font-bold text-gray-800">{employment?.unemployment_rate?.toFixed(1) || 0}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Salário Médio</p>
              <p className="font-bold text-gray-800">{formatCurrency(employment?.average_salary || 0)}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">População</p>
              <p className="text-sm text-gray-700">
                {new Intl.NumberFormat('pt-BR').format(state.population)} habitantes
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Principais Setores</p>
              <div className="flex flex-wrap gap-1">
                {employment?.main_industries?.slice(0, 3).map((industry, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
