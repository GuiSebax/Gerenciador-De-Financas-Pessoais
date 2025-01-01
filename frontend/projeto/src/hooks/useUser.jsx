import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useUser = () => {
    const [users, setUsers] = useState([]);
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

    const createUser = async (userData) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.post(`${API_URL}/register`, userData, config);
            setUsers((prevUsers) => [...prevUsers, response.data.user]);
        });
    };

    const getAllUsers = async () => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.get(`${API_URL}/users`, config);
            setUsers(response.data.data);
        });
    };

    const getUserById = async (id) => {
        let user;
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.get(`${API_URL}/users/${id}`, config);
            user = response.data.data;
        });
        return user;
    };

    const updateUser = async (id, userData) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            const response = await axios.put(`${API_URL}/users/${id}`, userData, config);
            setUsers((prevUsers) => prevUsers.map((user) => user.id === id ? response.data.data : user));
        });
    };

    const deleteUser = async (id) => {
        await fetchData(async () => {
            const config = getTokenConfig();
            await axios.delete(`${API_URL}/users/${id}`, config);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return { users, loading, error, createUser, updateUser, deleteUser, getUserById, getAllUsers };
};
