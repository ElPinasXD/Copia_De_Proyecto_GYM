import React, { useState } from "react";
import "./Formulario.css";

const FormularioPago = ({ onClose }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (event) => {
    event.preventDefault();

    // Validación de campos
    if (!name.trim() || cardNumber.length !== 16 || !expiryMonth || !expiryYear || !cvv) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    // Validación adicional para mes y año de expiración
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = parseInt(expiryMonth, 10);
    const expYear = parseInt(expiryYear, 10);

    if (expMonth < 1 || expMonth > 12) {
      alert("Mes de expiración inválido.");
      return;
    }

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert("La tarjeta ha expirado.");
      return;
    }

    // Si todas las validaciones pasan, procesa el pago
    console.log("Datos de pago:", { name, cardNumber, expiryMonth, expiryYear, cvv });
    onClose();
  };

  return (
    <div className="payment-form__card">
      <div className="payment-form__header">
        <h3 className="payment-form__title">Pagar con tarjeta</h3>
        <p className="payment-form__description">Ingresa tus datos de pago</p>
      </div>
      <form onSubmit={handlePayment} className="payment-form__form">
        <div className="payment-form__input-group">
          <label className="payment-form__label" htmlFor="name">
            Nombre y apellidos
          </label>
          <input
            className="payment-form__input"
            id="name"
            placeholder="Nombre Apellido"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="payment-form__input-group">
          <label className="payment-form__label" htmlFor="card-number">
            Número de tarjeta
          </label>
          <input
            className="payment-form__input"
            id="card-number"
            placeholder="0000 0000 0000 0000"
            type="text"
            value={cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 16) {
                setCardNumber(value);
              }
            }}
            required
            maxLength="16"
            pattern="\d{16}"
          />
        </div>
        <div className="payment-form__date-group">
          <div className="payment-form__input-group">
            <label className="payment-form__label" htmlFor="expiry-month">
              Mes
            </label>
            <input
              className="payment-form__input"
              id="expiry-month"
              placeholder="MM"
              type="text"
              value={expiryMonth}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 2) {
                  setExpiryMonth(value);
                }
              }}
              required
              maxLength="2"
              pattern="\d{2}"
            />
          </div>
          <div className="payment-form__input-group">
            <label className="payment-form__label" htmlFor="expiry-year">
              Año
            </label>
            <input
              className="payment-form__input"
              id="expiry-year"
              placeholder="AA"
              type="text"
              value={expiryYear}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 2) {
                  setExpiryYear(value);
                }
              }}
              required
              maxLength="2"
              pattern="\d{2}"
            />
          </div>
          <div className="payment-form__input-group">
            <label className="payment-form__label" htmlFor="cvv">
              CVV
            </label>
            <input
              className="payment-form__input"
              id="cvv"
              placeholder="CVV"
              type="text"
              value={cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 3) {
                  setCvv(value);
                }
              }}
              required
              maxLength="3"
              pattern="\d{3}"
            />
          </div>
        </div>
        <div className="payment-form__footer">
          <button type="submit" className="payment-form__pay-button">
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPago;