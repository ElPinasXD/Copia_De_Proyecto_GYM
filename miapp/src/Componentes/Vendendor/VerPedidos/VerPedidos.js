import React, { useState, useEffect } from 'react';
import './VerPedidos.css';
import BocadilloGuayaba from "../../../assets/images/bocadillo_de_guayaba.jpg";
import ArequipeCasero from "../../../assets/images/RV2UGXYKRREGTLRYXX5LYEXFUU.jpg";
import PanelitasMaíz from "../../../assets/images/hq720.jpg";
import Buñuelos from "../../../assets/images/images (3).jpg";
import Natilla from "../../../assets/images/images (4).jpg";

const mockData = [
    {
        id: 1,
        clientName: "Juan Pérez",
        image: BocadilloGuayaba,
        address: "Calle Falsa 123",
        phone: "3001234567",
        product: "Bocadillo de Guayaba",
        quantity: 2,
        price: "$2400",
        paymentMethod: "Efectivo",
        presentation: "Individual"
    },
    {
        id: 2,
        clientName: "María Gómez",
        image: ArequipeCasero,
        address: "Avenida Siempre Viva 742",
        phone: "3007654321",
        product: "Arequipe Casero",
        quantity: 1,
        price: "$3000",
        paymentMethod: "Débito",
        presentation: "Paquete"
    },
    {
        id: 3,
        clientName: "Sebastian Ramirez",
        product: "Buñuelos",
        image: Buñuelos,
        quantity: 3,
        price: "$6000",
        paymentMethod: "Efectivo",
        presentation: "Individual",
        address: "Calle Falsa 123, Ciudad",
        phone: "3001234567"


    },
    {
        id: 4,
        clientName: "Carlos Rodríguez",
        product: "Panelitas de Maíz",
        image: PanelitasMaíz,
        quantity: 1,
        price: "$3200",
        paymentMethod: "Crédito",
        presentation: "Individual",
        address: "Carrera 15 #10-20, Ciudad",
        phone: "3009876543"
    },
    {
        id: 5,
        clientName: "Ana Sofia",
        product: "Natilla",
        image: Natilla,
        quantity: 5,
        price: "$2500",
        paymentMethod: "Débito",
        presentation: "Paquete",
        address: "Avenida Siempre Viva 742, Ciudad",
        phone: "3007654321"
    }
];

function VerPedidos() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleViewMore = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="verPedidosContainer">
            <div className="ordersGrid">
                {mockData.map((order) => (
                    <div key={order.id} className="orderCard">
                        <img src={order.image} alt={`Producto ${order.id}`} className="orderImage" />
                        <div className="orderDetails">
                            <span className="clientName">{order.clientName}</span>
                            <button onClick={() => handleViewMore(order)} className="viewMoreButton">Ver Más</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOrder && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="closeModalButton" onClick={handleCloseModal}>X</button>
                        <h3 className="modalTitle">{selectedOrder.clientName}</h3>
                        <p><strong>Dirección:</strong> {selectedOrder.address}</p>
                        <p><strong>Teléfono:</strong> {selectedOrder.phone}</p>
                        <p><strong>Producto:</strong> {selectedOrder.product}</p>
                        <p><strong>Cantidad:</strong> {selectedOrder.quantity}</p>
                        <p><strong>Precio:</strong> {selectedOrder.price}</p>
                        <p><strong>Método de pago:</strong> {selectedOrder.paymentMethod}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerPedidos;