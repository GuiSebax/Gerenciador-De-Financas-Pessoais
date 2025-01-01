import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { NavLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const NavBar = () => {

    const { auth } = useAuthContext();
    const { user, logout } = auth;
    const {users, getAllUsers } = useUser();
    const [usuarioLogado, setUsuarioLogado] = useState(null)

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        if (user && users) {
            const usuario = users.find((u) => u.id === user.id)
            setUsuarioLogado(usuario)
        }
    }, [users, user])

    // Pegar o usuário que está logado



  return (
    <nav className="bg-gradient-to-br from-light-green-800 via-light-green-600 to-light-green-800 flex 
                    justify-between items-center p-4 shadow-2xl">
        {usuarioLogado && user ? (
            <h1 className="font-bold text-4xl text-light-green-50">Olá {usuarioLogado.name}</h1>
        ) : (
            <h1 className="font-bold text-4xl text-light-green-50">Finance-me</h1>
        )}
        <div className="flex space-x-4">
            {user ? (
                user.role === 'user' ? (
                    <ul className="flex space-x-5 text-light-green-50">
                        <li className=" nav-item"><NavLink to="/">Home</NavLink></li>
                        <li className=" nav-item"><NavLink to="/transactions">Transações</NavLink></li>l
                        <li className=" nav-item"><NavLink to="/goals">Metas</NavLink></li>
                        <li className=" nav-item"><NavLink to="/profile">Perfil</NavLink></li>
                        {/* Adicionar Logout*/}
                        <li className='nav-item'><NavLink to="/" onClick={() => logout()}>Logout</NavLink></li>
                    </ul>
                ) : (
                    <ul className="flex space-x-5 text-light-green-50">
                        <li className=" nav-item"><NavLink to="/">Home</NavLink></li>
                        <li className=" nav-item"><NavLink to="/transactions">Transações</NavLink></li>
                        <li className=" nav-item"><NavLink to="/goals">Metas</NavLink></li>
                        <li className=" nav-item"><NavLink to="/profile">Perfil</NavLink></li>
                        <li className=" nav-item"><NavLink to="/users">Usuários</NavLink></li>
                        <li className='nav-item'><NavLink to="/" onClick={() => logout()}>Logout</NavLink></li>
                    </ul>
                )
            ) : (
                <ul className="flex space-x-5 text-light-green-50">
                    <li className=" nav-item"><NavLink to="/">Home</NavLink></li>
                    <li className=" nav-item"><NavLink to="/login">Login</NavLink></li>
                    <li className=" nav-item"><NavLink to="/register">Registrar</NavLink></li>
                </ul>
            )}
        </div>
    </nav>
  )


}
export default NavBar