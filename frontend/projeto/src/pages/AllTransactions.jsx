import React, { useEffect, useState } from 'react';
import { useTransaction } from '../hooks/useTransaction';
import { useAuthContext } from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';

const AllTransactions = () => {
    const { transactions, loading, erro, getAllTransactions, deleteTransaction, updateTransaction } = useTransaction();
    const [userId, setUserId] = useState('');
    const { auth } = useAuthContext();
    const { user } = auth;
    const navigate = useNavigate();

    const [transacoesFiltradas, setTransacoesFiltradas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Controle do modal
    const [selectedTransaction, setSelectedTransaction] = useState(null); // Transação selecionada

    useEffect(() => {
        getAllTransactions();
    }, []);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            const transacoesFiltradas = transactions.filter((transaction) => transaction.userId === user.id);
            setTransacoesFiltradas(transacoesFiltradas);
        }
    }, [transactions, user]);

    return (
        <div className="flex">
            <div className="w-full p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-light-green-700">Todas as Transações</h1>
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
                                <th className="border border-light-green-500 px-4 py-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoesFiltradas.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="border border-light-green-500 px-4 py-2">{transaction.amount}</td>
                                    <td className="border border-light-green-500 px-4 py-2">{transaction.type}</td>
                                    <td className="border border-light-green-500 px-4 py-2">{transaction.category}</td>
                                    <td className="border border-light-green-500 px-4 py-2">{transaction.description}</td>
                                    <td className="border border-light-green-500 px-4 py-2">{transaction.date}</td>
                                    <td className="border border-light-green-500 px-4 py-2">
                                        <button
                                            className="text-red-500 hover:text-red-700 transition duration-200"
                                            onClick={() => {
                                                setSelectedTransaction(transaction); // Define a transação selecionada
                                                setModalOpen(true); // Abre o modal
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 inline-block"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <button
                                            className="text-blue-500 hover:text-blue-700 transition duration-200 mr-2"
                                            onClick={() => {
                                                setSelectedTransaction(transaction); // Define a transação selecionada
                                                navigate(`/transactions/${transaction.id}`); // Navega para a página de detalhes
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 inline-block"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 17l4-4m0 0l-4-4m4 4H7"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de confirmação */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja excluir a transação?</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={() => setModalOpen(false)} // Fecha o modal
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    deleteTransaction(selectedTransaction.id); // Deleta a transação
                                    setModalOpen(false); // Fecha o modal
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
};

export default AllTransactions;
