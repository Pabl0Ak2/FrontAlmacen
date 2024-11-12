import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Inventory from './Inventory';

const ActiveProductsList = () => {
  const [productosActivos, setProductosActivos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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

        <button
          onClick={toggleModal}
          className="mr-20 absolute top-4 right-32 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
        >
          Ver Productos
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
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <Inventory />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveProductsList;
