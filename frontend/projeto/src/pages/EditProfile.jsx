import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

const EditProfile = () => {
  const { id } = useParams()
  const { getUserById, updateUser } = useUser()
  const navigate = useNavigate()

  const [initialData, setInitialData] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(id)
        setInitialData(user) // Guardar os dados iniciais
        setName(user.name)
        setEmail(user.email)
        setPassword('') // Limpar o campo de senha
        setRole(user.role)
      } catch (error) {
        console.error('Erro ao carregar o usuário:', error)
      }
    }
    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedUser = { name, email, password, role }

    // Verificar se os campos foram alterados
    const unchangedFields = []
    if (name === initialData.name) unchangedFields.push('Nome')
    if (email === initialData.email) unchangedFields.push('Email')
    if (password === '') unchangedFields.push('Senha') // Senha precisa ser alterada

    if (unchangedFields.length > 0) {
      setErrorMessage(`Os seguintes campos precisam ser alterados: ${unchangedFields.join(', ')}`)
      return
    }

    try {
      await updateUser(id, updatedUser)
      setSuccessMessage('Usuário atualizado com sucesso!')
      setTimeout(() => {
        navigate('/profile')
      }, 2000)
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error)
      setErrorMessage('Erro ao atualizar o usuário. Tente novamente.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-light-green-700">Editar Usuário</h1>
        {successMessage && <div className="text-green-600 mb-4 text-center font-bold">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 mb-4 text-center font-bold">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700">Perfil</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-light-green-500 focus:border-light-green-500"
            >
              <option value="">Selecione o perfil</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-light-green-500 hover:bg-light-green-600 text-white font-semibold rounded-md transition duration-200"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile