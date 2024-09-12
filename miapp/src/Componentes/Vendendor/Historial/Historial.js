import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Historial.css';

function Historial() {
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [productsMap, setProductsMap] = useState({}); // Mapa de productos

    // Función para obtener productos
    const fetchProducts = useCallback(async () => {
        try {
            const productsResponse = await axios.get('http://localhost:3005/products');
            const productsArray = productsResponse.data;

            // Crear un mapa de productos por nombre
            const productsMap = productsArray.reduce((map, product) => {
                map[product.name] = product;
                return map;
            }, {});

            setProductsMap(productsMap);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, []);

    // Función para obtener órdenes entregadas
    const fetchDeliveredOrders = useCallback(async (vendorUsername) => {
        try {
            const ordersResponse = await axios.get('http://localhost:3005/orders');
            
            const filteredOrders = ordersResponse.data.filter(order => 
                order.products.some(product => 
                    productsMap[product.name] && productsMap[product.name].madeBy === vendorUsername
                ) && order.status === 'Entregado'
            );
            
            setDeliveredOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching delivered orders:', error);
        }
    }, [productsMap]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            fetchProducts();
            fetchDeliveredOrders(storedUsername);
        }
    }, [fetchProducts, fetchDeliveredOrders]);

    // Obtener URL de la imagen del producto
    const getProductImageUrl = (productName) => {
        const product = productsMap[productName];
        return product ? product.image : '';
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            // Si no hay fecha, usamos la fecha actual
            return formatDateString(new Date());
        }
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Si la fecha es inválida, usamos la fecha actual
            return formatDateString(new Date());
        }
        
        // Si la fecha es válida, la formateamos
        return formatDateString(date);
    };
    
    const formatDateString = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <div className="historialContainer">
            {deliveredOrders.map((order) => (
                <div key={order.id} className="orderItem">
                    <div className="orderDate">
                        <h3>{formatDate(order.deliveryDate)}</h3>
                        <hr />
                    </div>
                    <div className="orderContent">
                    <img 
                        src={getProductImageUrl(order.products[0].name)}
                        alt={`Producto ${order.products[0].name}`} 
                        className="orderImage" 
                    />
                    <div className="orderInfo">
                            <span className="clientName">{order.name}</span>
                        </div>
                        <button className="viewMoreButtonHistorial">Ver Más</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Historial;
