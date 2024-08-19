import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/LogoTemporal.png';
import './IndexVendedor.css';

function SideMenu({ onPublicar, onPedidos, onClose, isOpen }) {
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        navigate('/'); // Navega al índice principal
    };

    return (
        <div className={`side-menu ${isOpen ? 'open' : ''}`}>
            <img src={Logo} alt="Logo" className="side-menu-logo" />
            <button onClick={onPublicar} className="menu-button">Publicar</button>
            <button onClick={onPedidos} className="menu-button">Pedidos</button>
            <button onClick={handleCerrarSesion} className="cerrar-sesion">Cerrar Sesión</button>
        </div>
    );
}

export default SideMenu;