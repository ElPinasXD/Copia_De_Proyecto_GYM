import React from "react";
import "./Header.css"; // Importa el archivo de estilos
import { useNavigate, useLocation } from 'react-router-dom';

import Logo from '../../assets/images/LogoTemporal.jpg';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isIndexVendedor = location.pathname === '/IndexVendedor';
  const isHomePage = location.pathname === '/'; // Verifica si estamos en la página principal

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <header className="headerUnique">
      <div className="logoUnique">
        <img src={Logo} alt="Logo" className="logo-imageUnique" />
      </div>
      <div className="header-buttons-container">
        {isHomePage && (
          <>
            <button 
              onClick={() => handleButtonClick('/registro')} 
              className="header-buttonUnique"
            >
              Registrarse
            </button>
            <button 
              onClick={() => handleButtonClick('/login')} 
              className="header-buttonUnique"
            >
              Iniciar Sesión
            </button>
          </>
        )}
        {!isHomePage && (
          <button 
            onClick={() => handleButtonClick(isIndexVendedor ? '/' : '/registro')} 
            className="header-buttonUnique"
          >
            {isIndexVendedor ? 'Cerrar Sesión' : 'Registrarse'}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
