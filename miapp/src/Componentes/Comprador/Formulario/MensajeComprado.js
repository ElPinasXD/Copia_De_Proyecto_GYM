import React from "react";
import './FormularioComprador.css'
import { useNavigate } from "react-router-dom";

function MensajeComprado () {
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate('/'); 
      };
      
    return (
        <div className="confirmacion-container">
          <div className="checkmark">✓</div>
          <p>Producto comprado exitosamente</p>
          <button className='botonVolver' onClick={handleVolver}>Volver</button>
        </div>
    )
}

export default MensajeComprado;