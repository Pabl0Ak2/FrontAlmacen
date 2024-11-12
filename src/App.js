import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AlmacenistaPage from './views/AlmacenistaPage';
import ProductosActivos from './views/ActiveProductos';
import AdminPage from './views/AdminPage';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const imagenC = "./assets/imagenes.jpg";
  
  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${imagenC})` }}
      >
          <Routes>
            <Route
              path="/"
              element={
                isLoginView ? (
                  // Vista de Login
                  <div>
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                      Inicia sesión
                    </h2>
                    <Login setIsLogin={setIsLogin} />
                    <p className="text-center mt-4 text-gray-600">
                      ¿Aún no tienes cuenta?{' '}
                      <button
                        onClick={() => setIsLoginView(false)}
                        className="text-blue-500 font-semibold hover:text-blue-700 transition duration-200"
                      >
                        Regístrate
                      </button>
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                      Regístrate
                    </h2>
                    <Register setIsLogin={setIsLogin} />
                    <p className="text-center mt-4 text-gray-600">
                      ¿Ya tienes cuenta?{' '}
                      <button
                        onClick={() => setIsLoginView(true)}
                        className="text-blue-500 font-semibold hover:text-blue-700 transition duration-200"
                      >
                        Inicia sesión
                      </button>
                    </p>
                  </div>
                )
              }
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/almacenista" element={<AlmacenistaPage />} />
            <Route path="/productos-activos" element={<ProductosActivos />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;
