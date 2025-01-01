import React, { useState } from 'react';
import { useUser } from '../hooks/useUser'; 
import { NavLink, useNavigate} from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { createUser, loading} = useUser(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const userData = { name, email, password, role };

    try {
      await createUser(userData);
      setSuccessMessage('Usuário registrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage('Erro ao registrar usuário.'); 
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-green-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-light-green-700">Registrar</h1>

        {successMessage && <div className="text-green-600 mb-4 text-center font-bold">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 mb-4 text-center font-bold">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">Função</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
            >
              <option value="user">Usuário</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-light-green-500 hover:bg-light-green-600'} text-white font-semibold rounded-md transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        <p className="mt-4 text-center">
          <NavLink to="/login" className="text-light-green-600 hover:underline">Já tem uma conta? Faça login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;