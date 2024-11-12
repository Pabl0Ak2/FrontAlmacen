import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidadInventario, setCantidadInventario] = useState(0);
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem('usuarioId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId) {
      alert('No estás logueado. Inicia sesión primero.');
      return;
    }

    const newProduct = {
      nombre_producto: nombreProducto,
      descripcion,
      cantidad_inventario: cantidadInventario,
      usuarioId,
    };

    try {
      await axios.post('http://localhost:3000/productos/crear', newProduct);
      alert('Producto creado correctamente');
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Hubo un problema al crear el producto');
    }
  };

  return (
    <div className="md:w-[500px] w-full p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Nombre del Producto</label>
          <input
            type="text"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Cantidad en Inventario</label>
          <input
            type="number"
            value={cantidadInventario}
            onChange={(e) => setCantidadInventario(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
