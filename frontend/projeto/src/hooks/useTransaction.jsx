import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função genérica para lidar com chamadas assíncronas
    const fetchData = async (callback) => {
        setLoading(true);
        setError(null);
        try {
            await callback();
        } catch (error) {
            console.error('Erro na requisição:', error);
            setError('Algo deu errado. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    // Obter token do armazenamento local
    const getTokenConfig = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const createTransaction = async (transactionData) => {
        console.log('Dados da transação:', transactionData);
        console.log('Configuração do Token:', getTokenConfig());
        await fetchData(async () => {
          const config = getTokenConfig();
          const response = await axios.post(`${API_URL}/transactions`, transactionData, config);
          setTransactions((prevTransactions) => [...prevTransactions, response.data.data]);
        });
      };
      

    const getAllTransactions = async () => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.get(`${API_URL}/transactions`, config);
            if (response.data && Array.isArray(response.data.data)) {
                setTransactions(response.data.data);
            } else {
                throw new Error('Erro ao processar os dados de transações.');
            }
        });
    };

    const getTransactionById = async (id) => {
        let transaction;
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.get(`${API_URL}/transactions/${id}`, config);
            transaction = response.data.data;
        });

        return transaction;
    };

    const updateTransaction = async (id, transactionData) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.put(`${API_URL}/transactions/${id}`, transactionData, config);
            setTransactions((prevTransactions) =>
                prevTransactions.map((transaction) =>
                    transaction.id === id ? response.data.data : transaction
                )
            );
        });
    };

    const deleteTransaction = async (id) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            await axios.delete(`${API_URL}/transactions/${id}`, config);
            setTransactions((prevTransactions) =>
                prevTransactions.filter((transaction) => transaction.id !== id)
            );
        });
    };

    useEffect(() => {
        getAllTransactions(); // Busca todas as transações ao carregar o hook
    }, []);

    return {
        transactions,
        loading,
        error,
        createTransaction,
        getAllTransactions,
        getTransactionById,
        updateTransaction,
        deleteTransaction,
    };
};
