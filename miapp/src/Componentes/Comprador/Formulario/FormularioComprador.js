import React, { useState } from 'react';
import './FormularioComprador.css'; // Asegúrate de importar el archivo CSS

const FormularioComprador = () => {
  // Estado para manejar la cantidad
  const [quantity, setQuantity] = useState(0);

  // Funciones para manejar el incremento y decremento
  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrement = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));

  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Rellene los campos</h3>
      </div>
      <div className="body">
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input
            className="input"
            id="name"
            placeholder="Ingrese su nombre"
            type="text"
          />
        </div>
        <div className="field">
          <label htmlFor="address">Dirección de entrega</label>
          <input
            className="input"
            id="address"
            placeholder="Ingrese su dirección"
            type="text"
          />
        </div>
        <div className="field">
          <label htmlFor="quantity">Cantidad</label>
          <div className="quantity">
            <button className="btn quantity-btn" onClick={decrement} disabled={quantity <= 0}>
              -
            </button>
            <input
              className="quantity-input"
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(e.target.value, 0))}
            />
            <button className="btn quantity-btn" onClick={increment}>
              +
            </button>
          </div>
        </div>
        <div className="field">
          <label htmlFor="price">Precio</label>
          <input
            className="price-input"
            id="price"
            readOnly
            type="number"
          />
        </div>
        <div className="field">
          <label>Método de pago</label>
          <div className="payment">
            <button type="button" className="btn full" aria-checked="true" value="cash" id="cash">
              Efectivo
            </button>
            <button type="button" className="btn full" aria-checked="false" value="debit" id="debit">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </span>
              Débito
            </button>
            <button type="button" className="btn full" aria-checked="false" value="credit" id="credit">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </span>
              Crédito
            </button>
          </div>
        </div>
        <div className="field">
          <label>Presentación</label>
          <div className="presentation">
            <button type="button" className="btn full" aria-checked="true" value="individual" id="individual">
              Individual
            </button>
            <button type="button" className="btn full" aria-checked="false" value="package" id="package">
              Paquete
            </button>
            <button type="button" className="btn full" aria-checked="false" value="other" id="other">
              Otro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioComprador;
