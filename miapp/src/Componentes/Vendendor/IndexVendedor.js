import React, { useState, useEffect, useRef } from 'react';
import './IndexVendedor.css';
import Publicar from './Publicar/Publicar';
import SideMenu from './Menu';
import VerPedidos from './VerPedidos/VerPedidos';

function IndexVendedor() {
    const [showPublicar, setShowPublicar] = useState(false);
    const [showVerPedidos, setShowVerPedidos] = useState(false); // Nuevo estado para VerPedidos
    const [showSideMenu, setShowSideMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleSideMenu = () => {
        setShowSideMenu(!showSideMenu);
    };

    const handlePublicar = () => {
        setShowPublicar(true);
        setShowVerPedidos(false); // Asegúrate de ocultar VerPedidos
        setShowSideMenu(false);
    };

    const handlePedidos = () => {
        setShowPublicar(false); // Oculta Publicar
        setShowVerPedidos(true); // Muestra VerPedidos
        setShowSideMenu(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.classList.contains('menu-icon')) {
                setShowSideMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className={`index-container ${showSideMenu ? 'menu-open' : ''}`}>
            <div
                className={`menu-icon ${showSideMenu ? 'open' : ''}`}
                onClick={toggleSideMenu}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>Bienvenido, Vendedor</h1>
            <div ref={menuRef}>
                <SideMenu
                    onPublicar={handlePublicar}
                    onPedidos={handlePedidos}
                    onClose={toggleSideMenu}
                    isOpen={showSideMenu}
                />
            </div>
            {showPublicar && <Publicar />}
            {showVerPedidos && <VerPedidos />} {/* Añade esto para renderizar VerPedidos */}
        </div>
    );
}

export default IndexVendedor;
