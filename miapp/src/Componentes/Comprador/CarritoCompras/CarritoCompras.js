import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Index/SearchContext";
import "./CarritoCompras.css";

function CarritoCompras() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useSearch();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Inicializar las cantidades cuando el carrito cambia
    const newQuantities = cart.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {});
    setQuantities(newQuantities);
  }, [cart]);

  const increment = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) + 1;
      updateCartItemQuantity(id, newQuantity);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const decrement = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(1, (prevQuantities[id] || 1) - 1);
      updateCartItemQuantity(id, newQuantity);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Para hacer una compra necesitas tener un producto o más en tu carrito de compras");
    } else {
      // Guardar el carrito actualizado en localStorage antes de redirigir
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate("/FormularioComprador");
    }
  };

  const handleClearCart = () => {
    clearCart();
    setQuantities({});
  };

  return (
    <div className="carritoWrapper">
      <header className="headerNimbusCarrito">
        <h1 className="headerMainTitle">
          Mis productos ({cart.length})
        </h1>
      </header>
      <div className="carritoItems">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            {cart.map((product) => {
              const quantity = quantities[product.id] || 1;
              const price = parseFloat(product.price.replace('$', '')) || 0;
              const totalPrice = price * quantity;

              return (
                <div key={product.id} className="carritoItem">
                  <img src={product.image} alt={product.name} className="carritoImage" />
                  <div className="carritoDetails">
                    <h3>{product.name}</h3>
                    <span className="price">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="quantity-container">
                    <div className="quantity-label">Cantidad</div>
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => decrement(product.id)}>
                        -
                      </button>
                      <input
                        type="text"
                        className="quantity-input"
                        value={quantity}
                        readOnly
                      />
                      <button className="quantity-btn" onClick={() => increment(product.id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(product.id)}
                    className="removeButton"
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
            
          </>
        )}
      </div>
      <button onClick={handlePurchase} className="purchaseButton">
        Comenzar Pago
      </button>
    </div>
  );
}

export default CarritoCompras;