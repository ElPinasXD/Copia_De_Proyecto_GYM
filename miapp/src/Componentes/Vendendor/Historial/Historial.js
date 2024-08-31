import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Historial.css';

function Historial() {
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            fetchDeliveredOrders(storedUsername);
        }
    }, []);

    const fetchDeliveredOrders = async (vendorUsername) => {
        try {
            const ordersResponse = await axios.get('http://localhost:3005/orders');
            const productsResponse = await axios.get('http://localhost:3005/products');
            
            const filteredOrders = ordersResponse.data.filter(order => 
                order.products.some(product => 
                    productsResponse.data.find(p => p.id === product.id && p.madeBy === vendorUsername)
                ) && order.status === 'Entregado'
            );
            
            setDeliveredOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching delivered orders:', error);
        }
    };

    const formatDate = (dateString) => {
        let date = dateString ? new Date(dateString) : new Date();
        if (isNaN(date.getTime())) {
            // Si la fecha no es válida, usa la fecha actual
            date = new Date();
        }
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
                        <img src={`/images/${order.products[0].image}`} alt={`Producto ${order.id}`} className="orderImage" />
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