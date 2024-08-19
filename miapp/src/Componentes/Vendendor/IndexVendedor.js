import React, { useState, useEffect, useRef } from 'react';
import './IndexVendedor.css';
import Publicar from './Publicar/Publicar';
import SideMenu from './Menu';

function IndexVendedor() {
    const [showPublicar, setShowPublicar] = useState(false);
    const [showSideMenu, setShowSideMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleSideMenu = () => {
        setShowSideMenu(!showSideMenu);
    };

    const handlePublicar = () => {
        setShowPublicar(true);
        setShowSideMenu(false);
    };

    const handlePedidos = () => {
        // Implementar lógica para mostrar pedidos
        setShowPublicar(false);
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
            <div className={`menu-icon ${showSideMenu ? 'menu-open' : ''}`} onClick={toggleSideMenu}>
                ☰
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
        </div>
    );
}

export default IndexVendedor;