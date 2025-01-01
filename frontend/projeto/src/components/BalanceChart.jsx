import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from 'react-responsive';

const data = [
  { name: 'Receitas', value: 400 },
  { name: 'Despesas', value: 300 },
  { name: 'Economias', value: 200 },
];

const COLORS = ['#4CAF50', '#FF5733', '#FFC107'];

const BalanceChart = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">Saldo Financeiro</h2>
      <div className="w-full max-w-xs">
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? 80 : 100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChart;