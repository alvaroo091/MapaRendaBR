import { X, Home, ShoppingBag, Bus, Heart, GraduationCap, Zap, PartyPopper, Briefcase, TrendingUp, Users } from 'lucide-react';
import type { StateWithData } from '../lib/types';

interface StateDetailModalProps {
  state: StateWithData;
  onClose: () => void;
}

export function StateDetailModal({ state, onClose }: StateDetailModalProps) {
  const cost = state.cost_of_living[0];
  const employment = state.employment_stats[0];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const costCategories = [
    { icon: Home, label: 'Moradia', value: cost?.housing_avg || 0, color: 'bg-blue-50 text-blue-600' },
    { icon: ShoppingBag, label: 'Alimentação', value: cost?.food_avg || 0, color: 'bg-green-50 text-green-600' },
    { icon: Bus, label: 'Transporte', value: cost?.transport_avg || 0, color: 'bg-yellow-50 text-yellow-600' },
    { icon: Heart, label: 'Saúde', value: cost?.healthcare_avg || 0, color: 'bg-red-50 text-red-600' },
    { icon: GraduationCap, label: 'Educação', value: cost?.education_avg || 0, color: 'bg-purple-50 text-purple-600' },
    { icon: Zap, label: 'Utilidades', value: cost?.utilities_avg || 0, color: 'bg-orange-50 text-orange-600' },
    { icon: PartyPopper, label: 'Lazer', value: cost?.entertainment_avg || 0, color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-1">{state.name}</h2>
              <p className="text-blue-100">Região {state.region}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium mb-1">Custo Total Mensal</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(cost?.total_monthly || 0)}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium mb-1">Salário Recomendado</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(cost?.minimum_salary_needed || 0)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <p className="text-sm text-purple-600 font-medium mb-1">Salário Médio</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(employment?.average_salary || 0)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Detalhamento de Custos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {costCategories.map((category, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                  <div className={`${category.color} p-3 rounded-lg`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{category.label}</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(category.value)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">% do total</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {((category.value / (cost?.total_monthly || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Mercado de Trabalho</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-600 font-medium">Taxa de Desemprego</p>
                </div>
                <p className="text-2xl font-bold text-red-900">{employment?.unemployment_rate?.toFixed(1) || 0}%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-blue-600 font-medium">Vagas Abertas</p>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {new Intl.NumberFormat('pt-BR').format(employment?.job_openings || 0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-600 font-medium">PIB per capita</p>
                </div>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(state.gdp_per_capita)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Principais Setores</h3>
            <div className="flex flex-wrap gap-2">
              {employment?.main_industries?.map((industry, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Informações Gerais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">População:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {new Intl.NumberFormat('pt-BR').format(state.population)} habitantes
                </span>
              </div>
              <div>
                <span className="text-gray-600">Área:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {new Intl.NumberFormat('pt-BR').format(state.area_km2)} km²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
