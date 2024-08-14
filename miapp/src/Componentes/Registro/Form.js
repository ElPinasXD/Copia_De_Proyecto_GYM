import React from "react";
import './Form.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();

  const handleLoginComprador = () => {
    navigate('/login'); // Asegúrate de que la ruta sea correcta y esté definida en App.js
  };

  const handleSubmitIndex = () => {
    navigate('/'); // Asegúrate de que la ruta sea correcta y esté definida en App.js
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Formulario</h1>
      <form className="form">
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre(s)"
          required
          className="form-input"
        />
        <input
          type="text"
          name="Apellido"
          placeholder="Apellido(s)"
          required
          className="form-input"
        />
        <input
          type="email"
          name="Correo"
          placeholder="Correo"
          required
          className="form-input"
        />
        <input
          type="number"
          name="Telefono"
          placeholder="Telefono"
          required
          className="form-input"
        />
        <input
          type="text"
          name="Usuario"
          placeholder="Usuario"
          required
          className="form-input"
        />
        <input
          type="password"
          name="Contraseña"
          placeholder="Contraseña"
          required
          className="form-input"
        />
        <button onClick={handleSubmitIndex}
          type="submit"
          className="form-submit"
        >
          Registrar
        </button>
      </form>
      <h2 className="login-prompt">
        Si ya tienes una cuenta{" "}
        <button onClick={handleLoginComprador} className="login-button">
          Inicia Sesión
        </button>
      </h2>
    </div>
  );
}

export default Form;