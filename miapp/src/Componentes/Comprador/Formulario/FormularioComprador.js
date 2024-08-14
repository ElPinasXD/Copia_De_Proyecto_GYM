import React, { useState } from 'react';
import './FormularioComprador.css';
import MensajeComprado from './MensajeComprado';
import { useNavigate } from 'react-router-dom';

const FormularioComprador = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [presentation, setPresentation] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);

  const navigate = useNavigate(); // Usar useNavigate aquí

  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrement = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));

  const handleVolverIndex = () => {
    navigate('/'); // Llamar a la función de navegación
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !address || quantity <= 0 || !paymentMethod || !presentation) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Formulario enviado', { name, address, quantity, paymentMethod, presentation });

    // Mostrar el mensaje de confirmación
    setIsPurchased(true);
  };

  return (
    <div className="card">
      {isPurchased ? (
        <MensajeComprado />
      ) : (
        <>
          <div className="header">
            <h3 className="title">Rellene los campos</h3>
          </div>
          <form onSubmit={handleSubmit} className="body">
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <input
                className="input"
                id="name"
                placeholder="Ingrese su nombre"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="address">Dirección de entrega</label>
              <input
                className="input"
                id="address"
                placeholder="Ingrese su dirección"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="quantity">Cantidad</label>
              <div className="quantity">
                <button type="button" className="btn quantity-btn" onClick={decrement} disabled={quantity <= 0}>
                  -
                </button>
                <input
                  className="quantity-input"
                  id="quantity"
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(e.target.value, 0))}
                  required
                />
                <button type="button" className="btn quantity-btn" onClick={increment}>
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
                <button
                  type="button"
                  className={`btn full ${paymentMethod === 'cash' ? 'selected' : ''}`}
                  aria-checked={paymentMethod === 'cash'}
                  value="cash"
                  id="cash"
                  onClick={() => setPaymentMethod('cash')}
                >
                  Efectivo
                </button>
                <button
                  type="button"
                  className={`btn full ${paymentMethod === 'debit' ? 'selected' : ''}`}
                  aria-checked={paymentMethod === 'debit'}
                  value="debit"
                  id="debit"
                  onClick={() => setPaymentMethod('debit')}
                >
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </span>
                  Débito
                </button>
                <button
                  type="button"
                  className={`btn full ${paymentMethod === 'credit' ? 'selected' : ''}`}
                  aria-checked={paymentMethod === 'credit'}
                  value="credit"
                  id="credit"
                  onClick={() => setPaymentMethod('credit')}
                >
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
                <button
                  type="button"
                  className={`btn full ${presentation === 'individual' ? 'selected' : ''}`}
                  aria-checked={presentation === 'individual'}
                  value="individual"
                  id="individual"
                  onClick={() => setPresentation('individual')}
                >
                  Individual
                </button>
                <button
                  type="button"
                  className={`btn full ${presentation === 'package' ? 'selected' : ''}`}
                  aria-checked={presentation === 'package'}
                  value="package"
                  id="package"
                  onClick={() => setPresentation('package')}
                >
                  Paquete
                </button>
              </div>
            </div>
            <div className='botones'>
              <button className="cancelar" type="button" onClick={handleVolverIndex}>Cancelar</button>
              <button className="comprar" type="submit">Comprar</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default FormularioComprador;
