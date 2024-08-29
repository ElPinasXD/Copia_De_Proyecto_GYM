import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/LogoTemporal.png';
import './IndexVendedor.css';

function SideMenu({ onPublicar, onPedidos, onClose, isOpen }) {
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        navigate('/'); // Navega al índice principal
        onClose(); // Cierra el menú
    };

    const handleIndexVendedor = () => {
        navigate('/IndexVendedor');
        onClose(); // Cierra el menú
    };

    const handlePublicar = () => {
        navigate('/IndexVendedor/Publicar');
        onClose(); // Cierra el menú
    };

    const handlePedidos = () => {
        navigate('/IndexVendedor/VerPedidos');
        onClose(); // Cierra el menú
    };

    return (
        <div className={`side-menu ${isOpen ? 'open' : ''}`}>
            <img src={Logo} onClick={handleIndexVendedor} alt="Logo" className="side-menu-logo" />
            <button onClick={handlePublicar} className="menu-button">Publicar</button>
            <button onClick={handlePedidos} className="menu-button">Pedidos</button>
            <button className="menu-button">Historial</button>
            <button onClick={handleCerrarSesion} className="cerrar-sesion">Cerrar Sesión</button>
        </div>
    );
}

export default SideMenu;
