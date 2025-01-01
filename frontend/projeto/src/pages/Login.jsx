import React, { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { auth } = useAuthContext();
  const { login, error, loading } = auth;
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const data = {
      email,
      password
    };

    try {
      await login(data);
      setSuccessMessage('Login realizado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 2000)
    } catch (err) {
      console.error(err);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-green-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center text-light-green-700">Login</h1>
        
        {successMessage && <div className="text-green-600 mb-4 text-center font-bold">{successMessage}</div>}
        {error && <div className="text-red-600 mb-4 text-center font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-light-green-500 hover:bg-light-green-600'} text-white font-semibold rounded-md transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          <NavLink to="/register" className="text-light-green-600 hover:underline">Cadastrar-se</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
