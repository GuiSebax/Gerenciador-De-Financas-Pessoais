import React from 'react'
import { useUser } from '../hooks/useUser'

const Admin = () => {
  const { users, deleteUser, error } = useUser() // Consumindo o estado e funções do hook

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id)
        alert('Usuário excluído com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir usuário:', error)
        alert('Erro ao excluir o usuário. Tente novamente.')
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-light-green-700 mb-6">Painel Administrativo</h1>
      {error && (
        <div className="text-red-600 mb-4 text-center font-bold">
          Erro ao carregar usuários: {error.message}
        </div>
      )}

      {users.length > 0 ? (
        <table className="w-full bg-white border border-light-green-500 rounded-lg shadow-md">
          <thead>
            <tr className="bg-light-green-200 text-black">
              <th className="py-2 border-light-green-500 px-4 border">ID</th>
              <th className="py-2 border-light-green-500 px-4 border">Nome</th>
              <th className="py-2 border-light-green-500 px-4 border">Email</th>
              <th className="py-2 border-light-green-500 px-4 border">Perfil</th>
              <th className="py-2 border-light-green-500 px-4 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center border border-light-green-500">
                <td className="border-light-green-500 py-2 px-4">{user.id}</td>
                <td className="border-light-green-500 py-2 px-4">{user.name}</td>
                <td className="border-light-green-500 py-2 px-4">{user.email}</td>
                <td className="border-light-green-500 py-2 px-4">{user.role}</td>
                <td className="border-light-green-500 py-2 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">Nenhum usuário encontrado.</p>
      )}
    </div>
  )
}

export default Admin
