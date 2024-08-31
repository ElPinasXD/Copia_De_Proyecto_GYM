import React, { useState, useEffect } from 'react';
import './VerPedidos.css';
import axios from 'axios';

function VerPedidos() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');

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
                ) && order.status !== 'Entregado' // Filtrar pedidos que no estén entregados
            );
            
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleViewMore = (order) => {
        setSelectedOrder(order);
        setIsEditModalOpen(false);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setIsEditModalOpen(false);
    };

    const handleEditStatus = (order) => {
        setSelectedOrder(order);
        setOrderStatus(order.status);
        setIsEditModalOpen(true);
    };

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const handleSaveStatus = async () => {
        try {
            await axios.patch(`http://localhost:3005/orders/${selectedOrder.id}`, { status: orderStatus });
            setOrders(orders.map(order => 
                order.id === selectedOrder.id ? {...order, status: orderStatus} : order
            ));
            if (orderStatus === 'Entregado') {
                setOrders(orders.filter(order => order.id !== selectedOrder.id));
            }
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
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
                            <button onClick={() => handleEditStatus(order)} className="editStatusButton">Editar Estado</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOrder && !isEditModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="closeModalButton" onClick={handleCloseModal}>X</button>
                        <h3 className="modalTitle">{selectedOrder.name}</h3>
                        <p><strong>Dirección:</strong> {selectedOrder.address}</p>
                        <p><strong>Teléfono:</strong> {selectedOrder.phoneNumber}</p>
                        <p><strong>Método de pago:</strong> {selectedOrder.paymentMethod}</p>
                        {selectedOrder.products.map(product => (
                            <div key={product.id}>
                                <p><strong>Producto: </strong> {product.name}</p>
                                <p><strong>Cantidad: </strong>{product.quantity}</p>
                                <p><strong>Total: </strong> ${product.totalPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="closeModalButton" onClick={handleCloseModal}>X</button>
                        <h3 className="modalTitle">Estado del Pedido</h3>
                        <label> 
                            <select value={orderStatus} onChange={handleStatusChange} className="styledSelect">
                                <option value="inicio">Seleccione el estado</option>
                                <option value="Entregado">Entregado</option>
                                <option value="Proceso">En proceso</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </label>
                        <div>
                            <button onClick={handleSaveStatus} className="saveButton">Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerPedidos;