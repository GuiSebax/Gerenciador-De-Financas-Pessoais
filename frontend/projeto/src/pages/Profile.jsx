import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { useAuthContext } from '../context/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { getAllUsers, users, error, loading, deleteUser } = useUser()
  const { auth, logout} = useAuthContext()
  const { user } = auth

  const [usuarioFiltrado, setUsuarioFiltrado] = useState(null)
  const [photo, setPhoto] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Recuperando foto armazenada no localStorage (se existir)
    const storedPhoto = localStorage.getItem('userPhoto')
    if (storedPhoto) {
      setPhoto(storedPhoto)
    }
    getAllUsers()
  }, [])

  useEffect(() => {
    if (user && users) {
      const usuario = users.find((u) => u.id === user.id)
      setUsuarioFiltrado(usuario)
    }
  }, [users, user])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const photoUrl = reader.result
        setPhoto(photoUrl)
        // Armazenando a foto no localStorage
        localStorage.setItem('userPhoto', photoUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (window.confirm('Tem certeza que deseja deletar sua conta?')) {
      await deleteUser(usuarioFiltrado.id)
      navigate('/login')

      // Remover usuário do localStorage
      localStorage.removeItem('userPhoto')
      // Precisa deslogar
      logout()

    }

  }

  const handleEditProfile = () => {
    navigate(`/profile/edit/${usuarioFiltrado.id}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg mb-5">
        <h1 className="text-3xl font-bold mb-6 text-light-green-700 text-center">
          Meu Perfil
        </h1>
        {loading && <div>Carregando...</div>}
        {usuarioFiltrado ? (
          <div className="flex flex-col items-center">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div
                className={`w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300 ${
                  photo ? 'bg-cover bg-center' : ''
                }`}
                style={{
                  backgroundImage: photo ? `url(${photo})` : 'none',
                }}
              >
                {!photo && (
                  <span className="text-gray-500">Upload</span>
                )}
              </div>
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {photo && (
              <button
                onClick={() => {
                  setPhoto(null)
                  // Remover foto do localStorage
                  localStorage.removeItem('userPhoto')
                }}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remover Foto
              </button>
            )}

            <div className='bg-light-green-700 w-full h-0.5 mt-5 rounded-xl'></div>

            <div className="mt-4 text-left w-full">
              <p className="text-lg font-semibold text-black">
                Nome:
                <span className="ml-2 font-normal text-gray-600">
                  {usuarioFiltrado.name}
                </span>
              </p>
              <p className="text-lg font-semibold text-black mt-2">
                E-mail:
                <span className="ml-2 font-normal text-gray-600">
                  {usuarioFiltrado.email}
                </span>
              </p>
              <p className="text-lg font-semibold text-black mt-2">
                Senha:
                <span className="ml-2 font-normal text-gray-600">
                  {usuarioFiltrado.password}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/transactions/all')}
            className="py-2 px-4 bg-light-green-500 hover:bg-light-green-600 text-white font-semibold rounded-md transition duration-200"
          >
            Ver minhas transações
          </button>
          <button
            onClick={() => navigate('/goals/all')}
            className="py-2 px-4 bg-light-green-500 hover:bg-light-green-600 text-white font-semibold rounded-md transition duration-200"
          >
            Ver minhas metas
          </button>
          <button
            onClick={handleEditProfile}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200"
          >
            Editar Perfil
          </button>
          <button
            onClick={handleDeleteAccount}
            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-200"
          >
            Deletar Conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
