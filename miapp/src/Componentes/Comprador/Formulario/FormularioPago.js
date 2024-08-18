import React, { useState } from "react";
import "./Formulario.css"; // Asegúrate de tener el CSS adecuado

const FormularioPago = ({ onClose }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // Aquí puedes agregar la lógica de pago
    console.log("Datos de pago:", {
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    });
    onClose(); // Cierra el formulario de pago
  };

  return (
    <div className="payment-form__card">
      <div className="payment-form__header">
        <h3 className="payment-form__title">Pagar con tarjeta</h3>
        <p className="payment-form__description">Ingresa tus datos de pago</p>
      </div>
      <div className="payment-form__form">
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
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="payment-form__date-group">
          <div className="payment-form__input-group">
            <label className="payment-form__label" htmlFor="expiry-month">
              Vencimiento
            </label>
            <input
              className="payment-form__input"
              id="expiry-month"
              placeholder="Mes"
              type="text"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              required
            />
          </div>
          <div className="payment-form__input-group">
            <label className="payment-form__label" htmlFor="expiry-year">
              Año
            </label>
            <input
              className="payment-form__input"
              id="expiry-year"
              placeholder="Año"
              type="text"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
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
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="payment-form__footer">
        <button className="payment-form__pay-button" onClick={handlePayment}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default FormularioPago;
