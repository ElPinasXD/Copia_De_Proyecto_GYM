import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import './IndexVendedor.css';
import SideMenu from './Menu';

function IndexVendedor() {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleSideMenu = () => {
        setShowSideMenu(!showSideMenu);
    };

    const handleMenuClose = () => {
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
            <div ref={menuRef}>
                <SideMenu
                    onPublicar={handleMenuClose}
                    onPedidos={handleMenuClose}
                    onClose={handleMenuClose}
                    isOpen={showSideMenu}
                />
            </div>
            <h1>Bienvenido, Vendedor</h1>
            <Outlet /> {/* Renderiza el contenido basado en la ruta */}
        </div>
    );
}

export default IndexVendedor;
