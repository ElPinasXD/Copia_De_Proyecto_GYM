import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import './IndexVendedor.css';
import SideMenu from './Menu';

function IndexVendedor() {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const menuRef = useRef(null);
    const [username, setUsername] = useState('Vendedor');
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3005/products');
            const vendorProducts = response.data.filter(product => product.madeBy === username);
            setProducts(vendorProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [username]);

    useEffect(() => {
        if (location.pathname === '/IndexVendedor') {
            fetchProducts();
        }
    }, [location.pathname, fetchProducts]); // Use fetchProducts here

    const toggleSideMenu = () => {
        setShowSideMenu(!showSideMenu);
    };

    const handleMenuClose = () => {
        setShowSideMenu(false);
    };

    const handleInhabilitar = async (productId) => {
        try {
            // Actualizar el producto a cantidad 0
            await axios.patch(`http://localhost:3005/products/${productId}`, { quantity: 0 });
            fetchProducts(); // Refetch products after disabling
        } catch (error) {
            console.error('Error disabling product:', error);
        }
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
            <h1>Bienvenido, {username}</h1>
            
            {location.pathname === '/IndexVendedor' && (
                <div className="products-container">
                    <h2>Mis productos ({products.length})</h2>
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <p className="product-name">{product.name}</p>
                                <button onClick={() => handleInhabilitar(product.id)} className="inhabilitar-button">
                                    Inhabilitar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <Outlet />
        </div>
    );
}

export default IndexVendedor;
