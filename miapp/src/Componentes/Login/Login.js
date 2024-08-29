import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Usuario') {
      setUsername(value);
    } else if (name === 'Contraseña') {
      setPassword(value);
    }
  };

  const handleIndexVendedor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/Vendedor');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const vendedores = await response.json();
      const user = vendedores.find(v => v.Usuario === username && v.Contraseña === password);
      if (user) {
        navigate('/IndexVendedor', { state: { username } });
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Hubo un problema con la autenticación');
    }
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
          value={password}
          onChange={handleInputChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-submit">
          Entrar
        </button>
      </form>
      <h2 className="login-prompt">
        Si no tienes una cuenta{" "}
        <button onClick={() => navigate('/Registro')} className="login-button">
          Regístrate
        </button>
      </h2>
    </div>
  );
}

export default Login;
