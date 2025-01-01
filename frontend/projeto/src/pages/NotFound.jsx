import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-green-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-light-green-700 mb-4">404 - Página Não Encontrada</h1>
        <p className="text-lg text-gray-600 mb-4">Desculpe, a página que você está procurando não existe.</p>
        <NavLink to="/" className="py-2 px-4 bg-light-green-500 hover:bg-light-green-600 text-white font-semibold rounded-md transition duration-200">
          Voltar para a Home
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound