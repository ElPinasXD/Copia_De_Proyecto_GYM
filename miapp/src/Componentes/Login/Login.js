import React from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleFormVendedor = () => {
    navigate('/registro');
  };

  const handleIndexVendedor = () => {
    navigate('/IndexVendedor');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Inicio de Sesión</h1>
      <form className="login-form">
        <input
          type="text"
          name="Usuario"
          placeholder="Usuario"
          required
          className="login-input"
        />
        <input
          type="password"
          name="Contraseña"
          placeholder="Contraseña"
          required
          className="login-input"
        />
        <button onClick={handleIndexVendedor}
          type="submit"
          className="login-submit"
          >
          Entrar
        </button>
      </form>
      <h2 className="login-prompt">
        Si no tienes una cuenta{" "}
        <button onClick={handleFormVendedor} className="login-button">
          Regístrate
        </button>
      </h2>
    </div>
  );
}

export default Login;
