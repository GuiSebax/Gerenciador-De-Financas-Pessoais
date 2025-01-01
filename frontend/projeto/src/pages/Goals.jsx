import React, { useState, useEffect } from 'react';
import { useGoal } from '../hooks/useGoal';
import { useAuthContext } from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const { goals, loading, error, getAllGoals, createGoal } = useGoal();
  const { auth } = useAuthContext();
  const { user } = auth;

  const [metasFiltradas, setMetasFiltradas] = useState([]);

  useEffect(() => {
    getAllGoals();
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      const metasFiltradas = goals.filter((goal) => goal.userId === user.id);
      setMetasFiltradas(metasFiltradas);
    }
  }, [goals, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goal = { userId, amount, period };

    try {
      await createGoal(goal);
      setSuccessMessage('Meta criada com sucesso!');
    } catch (err) {
      console.error(err);
    } finally {
      setAmount(0);
      setPeriod('');
    }
  };

  const IrparaTodas = () => {
    navigate('/goals/all');
  }  

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-light-green-700">Minhas Metas</h1>
        {loading && <div>Carregando...</div>}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-light-green-500">
            <thead>
              <tr className="bg-light-green-200">
                <th className="border border-light-green-500 px-4 py-2">Quantidade</th>
                <th className="border border-light-green-500 px-4 py-2">Período</th>
              </tr>
            </thead>
            <tbody>
              {metasFiltradas.slice(0, 10).map((goal) => (
                <tr key={goal.id} className="text-center">
                  <td className="border border-light-green-500 px-4 py-2">{goal.amount}</td>
                  <td className="border border-light-green-500 px-4 py-2">{goal.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
              onClick={() => IrparaTodas()}
              className={`w-full mt-4 py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-light-green-500 hover:bg-light-green-600'} text-white font-semibold rounded-md transition duration-200`}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Ver Minhas Metas'}
            </button>
      </div>

      <div className="border-l-4 border-light-green-500 mx-4 h-screen mt-4 mb-4"></div>

      <div className="w-1/2 p-4 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg h-2/3 mt-4">
          <h1 className="text-2xl font-bold text-center text-light-green-700">Cadastrar Meta</h1>
          {successMessage && <div className="text-green-600 mb-4 text-center font-bold">{successMessage}</div>}
          {error && <div className="text-red-600 mb-4 text-center font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label htmlFor="userId" className="block text-gray-700">Seu ID</label>
              <input
                type="text"
                id="userId"
                value={userId}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-gray-700">Quantidade</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
                required
                placeholder="Digite um valor"
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
                placeholder="Digite o período (ex: mensal)"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-light-green-500 hover:bg-light-green-600'} text-white font-semibold rounded-md transition duration-200`}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Cadastrar Meta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Goals;
