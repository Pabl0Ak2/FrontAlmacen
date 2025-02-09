import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  const toggleStatus = async (idProducto, currentStatus) => {
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';

    try {
      await axios.put(`http://localhost:3000/productos/${idProducto}/estatus`, { estatus: newStatus });

      setProductos(prevProductos =>
        prevProductos.map(producto =>
          producto.id_producto === idProducto
            ? { ...producto, estatus: newStatus }
            : producto
        )
      );
      alert('Estatus actualizado correctamente');
    } catch (error) {
      console.error('Error al cambiar el estatus:', error);
      alert('Hubo un problema al actualizar el estatus');
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Hubo un problema al obtener los productos');
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Lista de Productos</h2>
      <div className="overflow-x-auto">
      <div className="overflow-x-auto max-h-[300px]">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
    <thead>
      <tr className="bg-blue-600 text-white">
        <th className="px-4 py-2 text-left text-sm">Nombre</th>
        <th className="px-4 py-2 text-left text-sm">Descripción</th>
        <th className="px-4 py-2 text-left text-sm">Cantidad</th>
        <th className="px-4 py-2 text-left text-sm">Estatus</th>
        <th className="px-4 py-2 text-center text-sm">Acción</th>
      </tr>
    </thead>
  </table>
    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id_producto} className="hover:bg-gray-100">
            <td className="px-4 py-2 text-sm">{producto.nombre_producto}</td>
            <td className="px-4 py-2 text-sm">{producto.descripcion}</td>
            <td className="px-4 py-2 text-sm">{producto.cantidad_inventario}</td>
            <td className="px-4 py-2 text-sm">
              <span className={`px-3 py-1 rounded-full text-white ${producto.estatus === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`}>
                {producto.estatus}
              </span>
            </td>
            <td className="px-2 py-2 text-center">
              <button
                onClick={() => toggleStatus(producto.id_producto, producto.estatus)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {producto.estatus === 'Activo' ? 'Desactivar' : 'Activar'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
</div>

      </div>
    </div>
  );
};

export default ProductList;
