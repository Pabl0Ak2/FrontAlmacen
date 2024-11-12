import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminFormPage from './AdminFormPage';
import ListAdminPage from './ListAdminPage';
import MovimientosList from './ActiveProductos';

function AdminPage() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleRedirect = () => {
    navigate('/productos-activos');
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible); 
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioId');
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-screen-xl h-[660px] mx-auto bg-gray-200 bg-opacity-80 rounded-lg shadow-lg p-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Administrador</h1>
          <div className="flex space-x-4">
            <button
              onClick={toggleModal} 
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Ver Movimientos
            </button>
            <button
              onClick={handleLogout}
              className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <AdminFormPage />
          </div>
          <div className="md:block hidden">
            <ListAdminPage />
          </div>
        </div>
      </div>

     
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 p-6">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <MovimientosList />
            <div className="mt-4 text-center">
              <button
                onClick={toggleModal}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cerrar Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
