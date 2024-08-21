import React from "react";
import "./Publicar.css";
import { useNavigate } from "react-router-dom";

function MensajeProducto() {
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate("/IndexVendedor");
    };

    return (
        <div className="confirmacion-container">
            <div className="checkmark">✓</div>
            <p>Producto publicado exitosamente</p>
            <button className="botonVolver" onClick={handleVolver}>
                Volver
            </button>
        </div>
    );
}

export default MensajeProducto;
