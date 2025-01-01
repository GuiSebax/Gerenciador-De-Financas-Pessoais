import React, { useState, useEffect } from 'react';
import { useGoal } from '../hooks/useGoal';
import { useParams, useNavigate } from 'react-router-dom';

const GoalsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getGoalById, updateGoal } = useGoal();

  // Estados para os campos do formulário
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState('');
  const [userId, setUserId] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  // Função para buscar a meta pelo ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const goal = await getGoalById(id);
        setAmount(goal.amount);
        setPeriod(goal.period);
        setUserId(goal.userId);
      } catch (error) {
        console.error('Erro ao carregar a meta:', error);
      }
    };
    fetchData();
  }, [id]);

  // Função para salvar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGoal = { userId, amount: Number(amount), period};

    try {
      await updateGoal(id, updatedGoal);
      setSuccessMessage('Meta atualizada com sucesso!');
      setTimeout(() => {
        navigate('/goals/all');
      }, 2000);
    } catch (error) {
      console.error('Erro ao atualizar a meta:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-light-green-700">Editar Meta</h1>
        {successMessage && <div className="text-green-600 mb-4 text-center font-bold">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <label htmlFor="amount" className="block text-gray-700">Quantidade</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="period" className="block text-gray-700">Período</label>
            <input
              type="text"
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-light-green-500 hover:bg-light-green-600 text-white font-semibold rounded-md transition duration-200"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalsDetails;