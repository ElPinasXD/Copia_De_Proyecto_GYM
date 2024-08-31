import React, { useState, useEffect } from 'react';
import './VerPedidos.css';
import axios from 'axios';

function VerPedidos() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            fetchOrders(storedUsername);
        }
    }, []);

    const fetchOrders = async (vendorUsername) => {
        try {
            const ordersResponse = await axios.get('http://localhost:3005/orders');
            const productsResponse = await axios.get('http://localhost:3005/products');
            
            const filteredOrders = ordersResponse.data.filter(order => 
                order.products.some(product => 
                    productsResponse.data.find(p => p.id === product.id && p.madeBy === vendorUsername)
                )
            );
            
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleViewMore = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleEditStatus = (orderId) => {
        // Implement status editing logic here
        console.log('Edit status for order:', orderId);
    };

    return (
        <div className="verPedidosContainer">
            <div className="ordersTable">
                {orders.map((order) => (
                    <div key={order.id} className="orderRow">
                        <div className="orderColumn imageColumn">
                            <img src={`/images/${order.products[0].image}`} alt={`Producto ${order.id}`} className="orderImage" />
                        </div>
                        <div className="orderColumn nameColumn">
                            <span className="clientName">{order.name}</span>
                        </div>
                        <div className="orderColumn buttonColumn">
                            <button onClick={() => handleViewMore(order)} className="viewMoreButton">Ver Más</button>
                        </div>
                        <div className="orderColumn buttonColumn">
                            <button onClick={() => handleEditStatus(order.id)} className="editStatusButton">Editar Estado</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOrder && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="closeModalButton" onClick={handleCloseModal}>X</button>
                        <h3 className="modalTitle">{selectedOrder.name}</h3>
                        <p><strong>Dirección:</strong> {selectedOrder.address}</p>
                        <p><strong>Teléfono:</strong> {selectedOrder.phoneNumber}</p>
                        <p><strong>Método de pago:</strong> {selectedOrder.paymentMethod}</p>
                        <h4>Productos:</h4>
                        {selectedOrder.products.map(product => (
                            <div key={product.id}>
                                <p><strong>{product.name}</strong></p>
                                <p>Cantidad: {product.quantity}</p>
                                <p>Precio: ${product.price}</p>
                                <p>Total: ${product.totalPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerPedidos;