import React from 'react';

const goals = [
  { title: 'Viajar para a Europa', progress: 70 },
  { title: 'Comprar um Carro', progress: 40 },
  { title: 'Emergências', progress: 90 },
];

const GoalsProgress = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Progresso de Metas</h2>
      <ul>
        {goals.map((goal, index) => (
          <li key={index} className="mb-4">
            <span className="block font-semibold">{goal.title}</span>
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
