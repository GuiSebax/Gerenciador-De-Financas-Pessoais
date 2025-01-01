import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { NavLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const NavBar = () => {
  const { auth } = useAuthContext();
  const { user, logout } = auth;
  const { users, getAllUsers } = useUser();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (user && users) {
      const usuario = users.find((u) => u.id === user.id);
      setUsuarioLogado(usuario);
    }
  }, [users, user]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-light-green-800 via-light-green-600 to-light-green-800 flex justify-between items-center p-4 shadow-2xl">
      {usuarioLogado && user ? (
        <h1 className="font-bold text-2xl md:text-4xl text-light-green-50">Olá {usuarioLogado.name}</h1>
      ) : (
        <h1 className="font-bold text-2xl md:text-4xl text-light-green-50">Finance-me</h1>
      )}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-light-green-50 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>
      <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
        {user ? (
          user.role === 'user' ? (
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 text-light-green-50">
              <li className="nav-item"><NavLink to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink to="/transactions">Transações</NavLink></li>
              <li className="nav-item"><NavLink to="/goals">Metas</NavLink></li>
              <li className="nav-item"><NavLink to="/profile">Perfil</NavLink></li>
              <li className="nav-item"><NavLink to="/" onClick={() => logout()}>Logout</NavLink></li>
            </ul>
          ) : (
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 text-light-green-50">
              <li className="nav-item"><NavLink to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink to="/transactions">Transações</NavLink></li>
              <li className="nav-item"><NavLink to="/goals">Metas</NavLink></li>
              <li className="nav-item"><NavLink to="/profile">Perfil</NavLink></li>
              <li className="nav-item"><NavLink to="/users">Usuários</NavLink></li>
              <li className="nav-item"><NavLink to="/" onClick={() => logout()}>Logout</NavLink></li>
            </ul>
          )
        ) : (
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 text-light-green-50">
            <li className="nav-item"><NavLink to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/login">Login</NavLink></li>
            <li className="nav-item"><NavLink to="/register">Registrar</NavLink></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;