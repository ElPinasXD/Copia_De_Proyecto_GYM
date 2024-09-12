import React, { useState, useEffect, useCallback } from 'react';
import './VerPedidos.css';
import axios from 'axios';

function VerPedidos() {
    const [orders, setOrders] = useState([]);
    const [productsMap, setProductsMap] = useState({}); // Mapa de productos
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');

    // Función para obtener órdenes
    const fetchOrders = useCallback(async (vendorUsername) => {
        try {
            const ordersResponse = await axios.get('http://localhost:3005/orders');
            
            const filteredOrders = ordersResponse.data.filter(order => 
                order.products.some(product => 
                    productsMap[product.name] && productsMap[product.name].madeBy === vendorUsername
                ) && order.status !== 'Entregado' // Filtrar pedidos que no estén entregados
            );
            
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [productsMap]);

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

    // Usar useEffect para cargar datos
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            fetchOrders(storedUsername);
            fetchProducts();
        }
    }, [fetchOrders, fetchProducts]);

    // Obtener URL de la imagen del producto
    const getProductImageUrl = (productName) => {
        const product = productsMap[productName];
        return product ? product.image : '';
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
            if (orderStatus === 'Cancelado') {
                // Si el estado es 'Cancelado', eliminamos la orden del servidor
                await axios.delete(`http://localhost:3005/orders/${selectedOrder.id}`);
                // Eliminamos la orden de la lista local
                setOrders(orders.filter(order => order.id !== selectedOrder.id));
            } else {
                // Para otros estados, actualizamos la orden
                const updatedOrder = {
                    ...selectedOrder,
                    status: orderStatus,
                };
                
                if (orderStatus === 'Entregado') {
                    // Si el estado es 'Entregado', actualizamos la fecha de entrega
                    updatedOrder.deliveryDate = new Date().toISOString();
                }
                
                await axios.put(`http://localhost:3005/orders/${selectedOrder.id}`, updatedOrder);
                
                // Actualizamos la lista local de órdenes
                setOrders(orders.map(order => 
                    order.id === selectedOrder.id ? updatedOrder : order
                ));
            }
            
            // Cerramos el modal después de guardar
            setIsEditModalOpen(false);
            setSelectedOrder(null);
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
                            <img 
                                src={getProductImageUrl(order.products[0].name)} // Buscar imagen por nombre del producto
                                alt={`Producto ${order.products[0].name}`} 
                                className="orderImagePedidos" 
                            />
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
                                <option value=" ">Cancelado</option>
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
