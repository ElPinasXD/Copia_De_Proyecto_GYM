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
  const [passwordError, setPasswordError] = useState('');

  const handleLoginComprador = () => {
    navigate('/login');
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d.*\d)[^\s]{10,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError('La contraseña debe tener al menos 10 caracteres, 1 mayúscula, 1 carácter especial, 2 números y no debe contener espacios.');
    } else {
      setPasswordError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Contraseña') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
      validatePassword(value);
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      return; // Si hay errores en la contraseña, no envíes el formulario
    }
    try {
      const response = await fetch('http://localhost:3005/Vendedor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      console.log('Formulario enviado:', formData);
      navigate('/');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
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
          placeholder="Correo electrónico"
          required
          className="form-input"
          value={formData.Correo}
          onChange={handleChange}
        />
        <div className="input-container">
          <input
            type="tel"
            name="Telefono"
            placeholder="Número telefónico"
            required
            className="form-input"
            value={formData.Telefono}
            onChange={handleChange}
            pattern="\d{10}"
            title="Debe contener 10 dígitos numéricos"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="Usuario"
            placeholder="Usuario"
            required
            className="form-input"
            value={formData.Usuario}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="Contraseña"
            placeholder="Contraseña"
            required
            className="form-input"
            value={formData.Contraseña}
            onChange={handleChange}
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
        </div>
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
