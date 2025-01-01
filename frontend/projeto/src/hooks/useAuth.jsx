import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:3000/api/login";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token , setToken] = useState(null);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(API_URL, credentials);
            const { token } = response.data;
            setToken(token);

            const decoded = jwt_decode(token);
            setUser({id: decoded.id, role: decoded.role});

            localStorage.setItem("token", token);
            console.log("Login efetuado com sucesso");
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    } 

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    const checkAuth = () => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            try {
                const decoded = jwt_decode(savedToken);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (!isExpired) {
                    setToken(savedToken);
                    setUser({id: decoded.id, role: decoded.role});
                } else {
                    logout();
                }
            } catch {
                logout();
            }
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return { user, token, loading, error, login, logout, checkAuth };
}