import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Formulario.css";
import FormularioPago from "./FormularioPago";
import MensajeComprado from "./MensajeComprado";

const FormularioComprador = () => {
  const location = useLocation();
  const selectedProduct = location.state?.product;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [presentation, setPresentation] = useState("");
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [productPrice, setProductPrice] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const navigate = useNavigate();

  /*Calcular el precio del producto*/
  useEffect(() => {
    if (selectedProduct) {
      const price = parseFloat(selectedProduct.price.replace('$', ''));
      setProductPrice(price * quantity);
    }
  }, [selectedProduct, quantity]);

  const increment = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decrement = () =>
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));



  const handleVolverIndex = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!paymentMethod || !presentation) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    setIsPurchased(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!name.trim() || !address.trim()) {
        alert("Por favor, complete todos los campos.");
        return;
      }
    } else if (currentStep === 2) {
      if (quantity <= 0) {
        alert("Por favor, seleccione una cantidad válida.");
        return;
      }
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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
              <form className="form-body">
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
                <div className="form-field">
                  <label htmlFor="phoneNumber">Número de Teléfono</label>
                  <input
                    className="form-input"
                    id="phoneNumber"
                    placeholder="0000000000"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setPhoneNumber(value);
                      }
                    }}
                    required
                    maxLength="10"
                    pattern="\d{10}"
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
                <div className="form-field">
                  <label htmlFor="product">Producto</label>
                  <input
                    type="text"
                    id="product"
                    className="form-input"
                    value={selectedProduct?.name || ''}
                    readOnly
                  />
                </div>
                <div className="quantity-container">
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
                  <label htmlFor="price">Precio Total</label>
                  <input
                    type="text"
                    id="price"
                    className="form-input"
                    value={`$${productPrice.toFixed(2)}`}
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
                  <select
                    id="presentation"
                    className="form-input"
                    value={presentation}
                    onChange={(e) => setPresentation(e.target.value)}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Individual">Individual</option>
                    <option value="Paquete">Paquete</option>
                  </select>
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
                    className="btn-comprar"
                    onClick={handleSubmit}
                  >
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