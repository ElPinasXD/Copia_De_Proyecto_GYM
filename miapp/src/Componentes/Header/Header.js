import React from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/LogoTemporal.png";
import { useSearch } from "../Comprador/Index/SearchContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm, setSearchTerm, cart } = useSearch();

  const isIndexVendedor = location.pathname === "/IndexVendedor";
  const isHomePage = location.pathname === "/";

  const handleVolverIndex = () => {
    navigate("/");
  }

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (isIndexVendedor) {
    return null; // No renderizar el header en IndexVendedor
  }

  return (
    <header className="headerUnique">
      <div className="logoUnique">
        <img src={Logo} onClick={handleVolverIndex} alt="Logo" className="logo-imageUnique" />
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </form>
      
      <div className="header-buttons-container">
        {isHomePage && (
          <>
            <div className="IconoCarro" onClick={() => navigate("/CarritoCompras")}>
              <ion-icon name="cart-outline"></ion-icon>
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </div>
            <button
              onClick={() => handleButtonClick("/Registro")}
              className="header-buttonUnique"
            >
              Registrarse
            </button>
            <button
              onClick={() => handleButtonClick("/Login")}
              className="header-buttonUnique"
            >
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
