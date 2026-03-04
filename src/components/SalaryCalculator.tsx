import { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface SalaryCalculatorProps {
  minimumSalary: number;
  averageSalary: number;
  stateName: string;
}

export function SalaryCalculator({ minimumSalary, averageSalary, stateName }: SalaryCalculatorProps) {
  const [salary, setSalary] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const numericSalary = parseFloat(salary.replace(/\D/g, '')) || 0;
  const percentage = (numericSalary / minimumSalary) * 100;

  const getStatus = () => {
    if (numericSalary === 0) return null;
    if (numericSalary < minimumSalary) {
      return {
        icon: AlertCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        message: 'Salário abaixo do recomendado para viver confortavelmente',
        detail: `Você está ${formatCurrency(minimumSalary - numericSalary)} abaixo do recomendado`
      };
    }
    if (numericSalary >= minimumSalary && numericSalary < averageSalary) {
      return {
        icon: CheckCircle,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        message: 'Salário adequado, mas abaixo da média estadual',
        detail: `Você está ${formatCurrency(averageSalary - numericSalary)} abaixo da média`
      };
    }
    return {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      message: 'Salário acima da média estadual!',
      detail: `Você está ${formatCurrency(numericSalary - averageSalary)} acima da média`
    };
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setSalary(value);
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Calculadora de Salário</h3>
          <p className="text-sm text-gray-600">Verifique se seu salário é adequado para {stateName}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seu salário mensal (R$)
        </label>
        <input
          type="text"
          value={salary ? formatCurrency(numericSalary) : ''}
          onChange={handleSalaryChange}
          placeholder="Digite seu salário"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Salário Recomendado</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(minimumSalary)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Salário Médio</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(averageSalary)}</p>
        </div>
      </div>

      {status && (
        <div className={`${status.bg} rounded-lg p-4 border border-${status.color.split('-')[1]}-200`}>
          <div className="flex items-start gap-3">
            <status.icon className={`${status.color} w-6 h-6 flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
              <p className={`font-semibold ${status.color} mb-1`}>{status.message}</p>
              <p className="text-sm text-gray-700">{status.detail}</p>
              {percentage > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>0%</span>
                    <span>100%</span>
                    <span>150%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        percentage < 100 ? 'bg-red-500' : percentage < 130 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 150)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    {percentage.toFixed(0)}% do salário recomendado
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Dica</p>
            <p>O salário recomendado considera um orçamento equilibrado com 30% para despesas extras e poupança.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
