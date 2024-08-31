import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Index/SearchContext";
import axios from "axios";
import "./CarritoCompras.css";

function CarritoCompras() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useSearch();
  const [quantities, setQuantities] = useState({});
  const [availableQuantities, setAvailableQuantities] = useState({});

  useEffect(() => {
    const newQuantities = cart.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {});
    setQuantities(newQuantities);

    cart.forEach(product => {
      axios.get(`http://localhost:3005/products/${product.id}`)
        .then(response => {
          setAvailableQuantities(prev => ({
            ...prev,
            [product.id]: parseInt(response.data.quantity)
          }));
        })
        .catch(error => {
          console.error("Error al obtener la cantidad del producto:", error);
        });
    });
  }, [cart]);

  const increment = (id) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[id] || 1;
      const maxQuantity = availableQuantities[id] || Infinity;
      const newQuantity = Math.min(currentQuantity + 1, maxQuantity);
      updateCartItemQuantity(id, newQuantity);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const decrement = (id) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[id] || 1;
      const newQuantity = Math.max(1, currentQuantity - 1);
      updateCartItemQuantity(id, newQuantity);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(1, Math.min(parseInt(value) || 1, availableQuantities[id] || Infinity));
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
    updateCartItemQuantity(id, newQuantity);
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Para hacer una compra necesitas tener un producto o más en tu carrito de compras");
    } else {
      cart.forEach(product => {
        const quantity = quantities[product.id] || 1;
        axios.get(`http://localhost:3005/products/${product.id}`)
          .then(response => {
            const availableQuantity = parseInt(response.data.quantity);
            const newQuantity = availableQuantity - quantity;

            axios.put(`http://localhost:3005/products/${product.id}`, { ...response.data, quantity: newQuantity })
              .catch(error => {
                console.error("Error al actualizar la cantidad del producto:", error);
              });
          })
          .catch(error => {
            console.error("Error al obtener la cantidad del producto:", error);
          });
      });

      localStorage.setItem('cart', JSON.stringify(cart.map(product => ({
        ...product,
        quantity: quantities[product.id] || 1
      }))));
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
              const maxQuantity = availableQuantities[product.id] || Infinity;
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
                      <button 
                        className="quantity-btn" 
                        onClick={() => decrement(product.id)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        min={1}
                        max={maxQuantity}
                      />
                      <button 
                        className="quantity-btn" 
                        onClick={() => increment(product.id)}
                        disabled={quantity >= maxQuantity}
                      >
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
      <button onClick={handleClearCart} className="purchaseButton">
        Limpiar Carrito
      </button>
      <button onClick={handlePurchase} className="purchaseButton">
        Comenzar Pago
      </button>
    </div>
  );
}

export default CarritoCompras;