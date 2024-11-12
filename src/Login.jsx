import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLogin }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        correo,
        contraseña,
      });
      localStorage.setItem('usuarioId', response.data.idUsuario);
      localStorage.setItem('token', response.data.token);

      setMessage('Login exitoso');
      setIsLogin(true);

      const userRole = response.data.rol;
      const userName = response.data.nombre;
      console.log("User role:", userRole);
      console.log("User name:", userName);

      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'almacenista') {
        navigate('/almacenista');
      } else {
        setMessage('Rol desconocido');
      }
    } catch (error) {
      setMessage('Credenciales incorrectas');
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" bg-white shadow-lg rounded-lg p-8 w-[400px]">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Iniciar sesión</h2>
        {message && <div className="text-center text-red-500 mb-4">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold">Contraseña</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-4">
          <span>¿No tienes cuenta? </span>
          <a href="/registro" className="text-blue-600 hover:underline">Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
