import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Formulario.css";
import FormularioPago from "./FormularioPago";
import MensajeComprado from "./MensajeComprado";

const FormularioComprador = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [presentation, setPresentation] = useState("");
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Paso actual del formulario
  const [productPrice, setProductPrice] = useState(0); // Precio del producto
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Mostrar formulario de pago

  const navigate = useNavigate();

  const increment = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decrement = () =>
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));

  const handleVolverIndex = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !address || quantity <= 0 || !paymentMethod || !presentation) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    console.log("Formulario enviado", {
      name,
      address,
      quantity,
      paymentMethod,
      presentation,
    });

    setIsPurchased(true);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const calculatePrice = (quantity, price) => {
    setProductPrice(quantity * price);
  };

  const handlePaymentClose = () => {
    setShowPaymentForm(false);
  };

  return (
    <div className="form-card">
      {isPurchased ? (
        <MensajeComprado />
      ) : (
        <>
          {currentStep === 1 && (
            <div>
              <div className="form-header">
                <h3 className="form-title">Información de la compra</h3>
              </div>
              <form onSubmit={handleSubmit} className="form-body">
                <div className="form-field">
                  <label htmlFor="name">Nombre</label>
                  <input
                    className="form-input"
                    id="name"
                    placeholder="Ingrese su nombre"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="address">Dirección de entrega</label>
                  <input
                    className="form-input"
                    id="address"
                    placeholder="Ingrese su dirección"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button
                    type="button"
                    className="btn-regresar"
                    onClick={handleVolverIndex}
                  >
                    Regresar
                  </button>
                  <button
                    type="button"
                    className="btn-siguiente"
                    onClick={handleNextStep}
                  >
                    Siguiente
                  </button>
                </div>
              </form>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <div className="form-header">
                <h3 className="form-title">Información de la compra</h3>
              </div>
              <div className="form-body">
                <div className="quantity-container">
                  {" "}
                  Cantidad
                  <button className="quantity-btn" onClick={decrement}>
                    -
                  </button>
                  <input
                    type="text"
                    className="quantity-input"
                    value={quantity}
                    readOnly
                  />
                  <button className="quantity-btn" onClick={increment}>
                    +
                  </button>
                </div>
                <div className="form-field">
                  <label htmlFor="price">Precio</label>
                  <input
                    type="text"
                    id="price"
                    className="form-input"
                    value={`$${productPrice}`}
                    readOnly
                  />
                </div>
                <div className="form-buttons">
                  <button
                    type="button"
                    className="btn-regresar"
                    onClick={handlePrevStep}
                  >
                    Regresar
                  </button>
                  <button
                    type="button"
                    className="btn-siguiente"
                    onClick={handleNextStep}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <div className="form-header">
                <h3 className="form-title">Información de la compra</h3>
              </div>
              <div className="form-body">
                <div className="form-field">
                  <label htmlFor="payment-method">Método de Pago</label>
                  <select
                    id="payment-method"
                    className="form-input"
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      if (
                        e.target.value === "Debito" ||
                        e.target.value === "Credito"
                      ) {
                        setShowPaymentForm(true);
                      } else {
                        setShowPaymentForm(false);
                      }
                    }}
                    required
                  >
                    <option value="">Seleccione un método</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Debito">Débito</option>
                    <option value="Credito">Crédito</option>
                  </select>
                </div>
                {showPaymentForm && (
                  <FormularioPago onClose={handlePaymentClose} />
                )}
                <div className="form-field">
                  <label htmlFor="presentation">Presentación</label>
                  <input
                    type="text"
                    id="presentation"
                    className="form-input"
                    value={presentation}
                    onChange={(e) => setPresentation(e.target.value)}
                    placeholder="Detalles de la presentación"
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button
                    type="button"
                    className="btn-regresar"
                    onClick={handlePrevStep}
                  >
                    Regresar
                  </button>
                  <button type="submit" className="btn-comprar">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormularioComprador;
