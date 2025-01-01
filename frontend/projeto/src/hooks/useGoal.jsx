import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useGoal = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (callback) => {
        setLoading(true);
        setError(null);
        try {
            await callback();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getTokenConfig = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    const createGoal = async (goalData) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.post(`${API_URL}/goals`, goalData, config);
            setGoals((prevGoals) => [...prevGoals, response.data.data]);
        });
    };

    const getAllGoals = async () => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.get(`${API_URL}/goals`, config);
            setGoals(response.data.data);
        });
    };

    const getGoalById = async (id) => {
        let goal;
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.get(`${API_URL}/goals/${id}`, config);
            goal = response.data.data;
        });
        return goal;
    };

    const updateGoal = async (id, goalData) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.put(`${API_URL}/goals/${id}`, goalData, config);
            setGoals((prevGoals) => prevGoals.map((goal) => goal.id === id ? response.data.data : goal));
        });
    };

    const deleteGoal = async (id) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            await axios.delete(`${API_URL}/goals/${id}`, config);
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        });
    };

    useEffect(() => {
        getAllGoals();
    }, []);

    return { goals, loading, error, createGoal, updateGoal, deleteGoal, getGoalById, getAllGoals };
};
