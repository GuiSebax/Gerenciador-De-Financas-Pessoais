import React, { useState, useEffect } from 'react';
import { useTransaction } from '../hooks/useTransaction';
import { useAuthContext } from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const { transactions, loading, error, getAllTransactions, createTransaction } = useTransaction();
  const { auth } = useAuthContext();
  const { user } = auth;

  const [transacoesFiltradas, setTransacoesFiltradas] = useState([]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      const transacoesFiltradas = transactions.filter(transaction => transaction.userId === user.id);
      setTransacoesFiltradas(transacoesFiltradas);
    }
  }, [transactions, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = { userId, amount, type, category, description, date };

    try {
      await createTransaction(transaction);
      setSuccessMessage('Transação criada com sucesso!');
    } catch (err) {
      console.error(err);
    } finally {
      setAmount(0);
      setType('');
      setCategory('');
      setDescription('');
      setDate('');
    }
  };

  const IrparaTodas = () => {
    navigate('/transactions/all');
  }

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-light-green-700">Minhas Transações</h1>
        {loading && <div>Carregando...</div>}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-light-green-500">
            <thead>
              <tr className="bg-light-green-200">
                <th className="border border-light-green-500 px-4 py-2">Quantidade</th>
                <th className="border border-light-green-500 px-4 py-2">Tipo</th>
                <th className="border border-light-green-500 px-4 py-2">Categoria</th>
                <th className="border border-light-green-500 px-4 py-2">Descrição</th>
                <th className="border border-light-green-500 px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {transacoesFiltradas.slice(0, 10).map((transaction) => (
                <tr key={transaction.id} className="text-center">
                  <td className="border border-light-green-500 px-4 py-2">{transaction.amount}</td>
                  <td className="border border-light-green-500 px-4 py-2">{transaction.type}</td>
                  <td className="border border-light-green-500 px-4 py-2">{transaction.category}</td>
                  <td className="border border-light-green-500 px-4 py-2">{transaction.description}</td>
                  <td className="border border-light-green-500 px-4 py-2">{transaction.date}</td>
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
              {loading ? 'Carregando...' : 'Ver Minhas Transações'}
            </button>
      </div>

      <div className="border-l-4 border-light-green-500 mx-4 h-50 mt-4 mb-4"></div>

      <div className="w-1/2 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg ">
          <h1 className="text-2xl font-bold text-center text-light-green-700">Cadastrar Transação</h1>
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
                required
                setUserId={(e) => setUserId(e.target.value)}
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
                placeholder='Digite um valor'
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-gray-700">Tipo</label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
                required
                placeholder='Digite o tipo'
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700">Categoria</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
                required
                placeholder='Digite a categoria'
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">Descrição</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
                required
                placeholder='Digite a descrição'
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700">Data</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
                required

              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-light-green-500 hover:bg-light-green-600'} text-white font-semibold rounded-md transition duration-200`}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Cadastrar Transação'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
