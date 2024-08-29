import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioPago from "./FormularioPago";
import MensajeComprado from "./MensajeComprado";
import "./Formulario.css";

const FormularioComprador = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Obtiene el carrito del localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    // Redirige si el carrito está vacío
    if (storedCart.length === 0) {
      navigate("/CarritoCompras");
    }
  }, [navigate]);

  const handleVolverIndex = () => {
    navigate("/CarritoCompras");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!paymentMethod || !name || !address || !phoneNumber) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const orderDetails = {
      name,
      address,
      phoneNumber,
      paymentMethod,
      products: cart.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity || 1, // Asegúrate de tener esta cantidad en el carrito
        price: product.price.replace('$', ''), // Eliminamos el signo de dólar
        totalPrice: parseFloat(product.price.replace('$', '')) * (product.quantity || 1)
      })),
    };

    try {
      const response = await fetch("http://localhost:3005/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
      if (response.ok) {
        setIsPurchased(true);
        // Limpia el carrito en localStorage después de la compra
        localStorage.removeItem('cart');
        // Actualiza el estado del carrito
        setCart([]);
      } else {
        alert("Hubo un problema al procesar la compra.");
      }
    } catch (error) {
      alert("Error de red. Inténtelo nuevamente.");
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!name.trim() || !address.trim() || !phoneNumber.trim()) {
        alert("Por favor, complete todos los campos.");
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
                <h3 className="form-title">Pago del pedido</h3>
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
