import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleIndexVendedor = (e) => {
    e.preventDefault(); // Previene la recarga de la página
    navigate('/IndexVendedor', { state: { username } });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Inicio de Sesión</h1>
      <form className="login-form" onSubmit={handleIndexVendedor}>
        <input
          type="text"
          name="Usuario"
          placeholder="Usuario"
          required
          className="login-input"
          value={username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="Contraseña"
          placeholder="Contraseña"
          required
          className="login-input"
        />
        <button type="submit" className="login-submit">
          Entrar
        </button>
      </form>
      <h2 className="login-prompt">
        Si no tienes una cuenta{" "}
        <button onClick={() => navigate('/registro')} className="login-button">
          Regístrate
        </button>
      </h2>
    </div>
  );
}

export default Login;
