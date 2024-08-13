import React from "react";
import "./Header.css"; // Importa el archivo de estilos


function Header() {
  return (
    <header className="headerUnique">
      <div className="logoUnique">
        <img src="/logo.png" alt="Logo" className="logo-imageUnique" />
      </div>
      <div className="register-button-containerUnique">
        <button className="register-buttonUnique">Registrarse</button>
      </div>
    </header>
  );
}

export default Header;