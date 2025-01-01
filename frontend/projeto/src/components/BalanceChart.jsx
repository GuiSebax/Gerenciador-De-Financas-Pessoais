import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Receitas', value: 400 },
  { name: 'Despesas', value: 300 },
  { name: 'Economias', value: 200 },
];

const COLORS = ['#4CAF50', '#FF5733', '#FFC107'];

const BalanceChart = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Saldo Financeiro</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
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
    </div>
  );
};

export default BalanceChart;
