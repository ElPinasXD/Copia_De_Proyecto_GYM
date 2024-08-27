import React, { useState } from "react";
import './Form.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Usuario: '',
    Contraseña: ''
  });
  const [telefonoError, setTelefonoError] = useState('');

  const handleLoginComprador = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Telefono') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData(prevData => ({
          ...prevData,
          [name]: numericValue
        }));
        if (numericValue.length < 10) {
          const faltantes = 10 - numericValue.length;
          setTelefonoError(`Le faltan ${faltantes} número${faltantes !== 1 ? 's' : ''}`);
        } else {
          setTelefonoError('');
        }
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Telefono.length !== 10) {
      setTelefonoError('El teléfono debe tener 10 números');
      return;
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log('Formulario enviado:', formData);
    // Si todo está bien, navega a la página principal
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Formulario</h1>
      <form className="form-register" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre (s)"
          required
          className="form-input"
          value={formData.Nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Apellido"
          placeholder="Apellido (s)"
          required
          className="form-input"
          value={formData.Apellido}
          onChange={handleChange}
        />
        <input
          type="email"
          name="Correo"
          placeholder="Correo electronico"
          required
          className="form-input"
          value={formData.Correo}
          onChange={handleChange}
        />
        <div className="input-container">
          <input
            type="tel"
            name="Telefono"
            placeholder="Numero telefonico"
            required
            className="form-input"
            value={formData.Telefono}
            onChange={handleChange}
            pattern="\d{10}"
            title="Debe contener 10 dígitos numéricos"
          />
          {telefonoError && <span className="error-message">{telefonoError}</span>}
        </div>
        <input
          type="text"
          name="Usuario"
          placeholder="Usuario"
          required
          className="form-input"
          value={formData.Usuario}
          onChange={handleChange}
        />
        <input
          type="password"
          name="Contraseña"
          placeholder="Contraseña"
          required
          className="form-input"
          value={formData.Contraseña}
          onChange={handleChange}
        />
        <button
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