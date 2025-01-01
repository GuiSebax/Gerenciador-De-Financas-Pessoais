import React, { useState, useEffect } from 'react';
import { useTransaction } from '../hooks/useTransaction';
import { useParams, useNavigate } from 'react-router-dom';

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransactionById, updateTransaction } = useTransaction();

  // Estados para os campos do formulário
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  // Função para buscar a transação pelo ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const transaction = await getTransactionById(id);
        setAmount(transaction.amount);
        setType(transaction.type);
        setCategory(transaction.category);
        setDescription(transaction.description);
        setDate(transaction.date);
        setUserId(transaction.userId);
      } catch (error) {
        console.error('Erro ao carregar a transação:', error);
      }
    };
    fetchData();
  }, [id]);

  // Função para salvar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTransaction = { userId, amount: Number(amount), type, category, description, date };

    try {
      await updateTransaction(id, updatedTransaction);
      setSuccessMessage('Transação atualizada com sucesso!'); 
      setTimeout(() => {
        navigate('/transactions/all');
      }, 2000);

    } catch (error) {
      console.error('Erro ao atualizar a transação:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-light-green-700">Editar Transação</h1>
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
            <label htmlFor="type" className="block text-gray-700">Tipo</label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              required
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
            className="w-full py-2 px-4 bg-light-green-500 hover:bg-light-green-600 text-white font-semibold rounded-md transition duration-200"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionDetails;