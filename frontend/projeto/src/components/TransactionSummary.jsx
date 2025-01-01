import React from 'react';

const transactions = [
  { description: 'Compra Mercado', amount: -50 },
  { description: 'Salário', amount: 2000 },
  { description: 'Cinema', amount: -40 },
];

const TransactionSummary = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Resumo de Transações</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className={`flex justify-between p-2 ${
              transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            <span>{transaction.description}</span>
            <span>{transaction.amount < 0 ? '-' : '+'} R${Math.abs(transaction.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionSummary;
