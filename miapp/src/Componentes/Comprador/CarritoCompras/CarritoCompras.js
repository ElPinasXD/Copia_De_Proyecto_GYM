import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Index/SearchContext";
import "./CarritoCompras.css";

function CarritoCompras() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useSearch(); // Asegúrate de que `removeFromCart` esté disponible en el contexto

  const handlePurchase = () => {
    navigate("/FormularioPago");
  };

  return (
    <div className="carritoWrapper">
      <header className="headerNimbusUnique">
        <h1 className="headerMainTitleUnique">Carrito de Compras</h1>
      </header>
      <div className="carritoItems">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="carritoItem">
              <img src={product.image} alt={product.name} className="carritoImage" />
              <div className="carritoDetails">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>{product.price}</span>
              </div>
              <button 
                onClick={() => removeFromCart(product.id)} // Llama a la función para eliminar el producto
                className="removeButton"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
      <button onClick={handlePurchase} className="purchaseButton">
        Comprar
      </button>
    </div>
  );
}

export default CarritoCompras;
