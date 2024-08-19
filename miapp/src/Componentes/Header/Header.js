import React from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/LogoTemporal.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isIndexVendedor = location.pathname === "/IndexVendedor";
  const isHomePage = location.pathname === "/";

  const handleButtonClick = (path) => {
    navigate(path);
  };

  if (isIndexVendedor) {
    return null; // No renderizar el header en IndexVendedor
  }

  return (
    <header className="headerUnique">
      <div className="logoUnique">
        <img src={Logo} alt="Logo" className="logo-imageUnique" />
      </div>
      <div className="header-buttons-container">
        {isHomePage && (
          <>
            <button
              onClick={() => handleButtonClick("/registro")}
              className="header-buttonUnique"
            >
              Registrarse
            </button>
            <button
              onClick={() => handleButtonClick("/login")}
              className="header-buttonUnique"
            >
              Iniciar Sesión
            </button>
          </>
        )}
        {!isHomePage && !isIndexVendedor && (
          <button
            onClick={() => handleButtonClick("/registro")}
            className="header-buttonUniqueLog"
          >
            Registrarse
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;