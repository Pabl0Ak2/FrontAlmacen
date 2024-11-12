import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovimientosList = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movimientos');
        setMovimientos(response.data);
      } catch (error) {
        console.error('Error al obtener los movimientos:', error);
        alert('Hubo un problema al obtener los movimientos');
      }
    };

    fetchMovimientos();
  }, []);

  return (
    <div className="bg-red-300">
      <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Lista de Movimientos</h2>
        <div className="absolute top-4 right-6">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none">
            Nuevo Movimiento
          </button>
        </div>

        <div className="overflow-x-auto h-[600px] overflow-y-auto">
          <table className="min-w-full table-auto text-center border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">ID Movimiento</th>
                <th className="px-6 py-4 text-sm font-semibold">Usuario</th>
                <th className="px-6 py-4 text-sm font-semibold">Producto</th>
                <th className="px-6 py-4 text-sm font-semibold">Acción</th>
                <th className="px-6 py-4 text-sm font-semibold">Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.length > 0 ? (
                movimientos.map((movimiento) => (
                  <tr key={movimiento.idMovimiento} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-800">{movimiento.idMovimiento}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{movimiento.usuario?.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{movimiento.producto?.nombre_producto}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{movimiento.accion}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(movimiento.fechaHora).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay movimientos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovimientosList;
