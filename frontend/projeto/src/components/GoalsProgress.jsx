import React from 'react';

const goals = [
  { title: 'Viajar para a Europa', progress: 70 },
  { title: 'Comprar um Carro', progress: 40 },
  { title: 'Emergências', progress: 90 },
];

const GoalsProgress = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Progresso de Metas</h2>
      <ul className="w-full max-w-md">
        {goals.map((goal, index) => (
          <li key={index} className="mb-4">
            <span className="block font-semibold mb-1">{goal.title}</span>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsProgress;