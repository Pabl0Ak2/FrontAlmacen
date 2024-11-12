import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActiveProductsList = () => {
  const [productosActivos, setProductosActivos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/productos/activos');
        setProductosActivos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos activos:', error);
        alert('Hubo un problema al obtener los productos activos');
      }
    };

    fetchActiveProducts();
  }, []);

  const handleDecreaseQuantity = async (idProducto) => {
    try {
      await axios.put(`http://localhost:3000/productos/disminuir-cantidad/${idProducto}`);
      const response = await axios.get('http://localhost:3000/productos/activos');
      setProductosActivos(response.data);
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);
      alert('Hubo un problema al disminuir la cantidad');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Productos Activos</h2>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto rounded-lg border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-semibold">ID Producto</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Nombre</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Cantidad</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productosActivos.length > 0 ? (
              productosActivos.map((producto) => (
                <tr key={producto.id_producto} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{producto.id_producto}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{producto.nombre_producto}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{producto.cantidad_inventario}</td>
                  <td className="px-6 py-4 text-center text-sm">
                    <button
                      onClick={() => handleDecreaseQuantity(producto.id_producto)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Sacar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay productos activos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveProductsList;
