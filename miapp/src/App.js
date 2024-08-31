import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./Componentes/Header/Header";
import Footer from "./Componentes/Footer/Footer";
import IndexComprador from "./Componentes/Comprador/Index/Index";
import FormularioComprador from "./Componentes/Comprador/Formulario/FormularioComprador";
import Login from "./Componentes/Login/Login";
import Form from "./Componentes/Registro/Form";
import IndexVendedor from "./Componentes/Vendendor/IndexVendedor";
import MensajeComprado from "./Componentes/Comprador/Formulario/MensajeComprado";
import FormularioPago from "./Componentes/Comprador/Formulario/FormularioPago";
import Publicar from "./Componentes/Vendendor/Publicar/Publicar";
import VerPedidos from "./Componentes/Vendendor/VerPedidos/VerPedidos";
import MensajeProducto from "./Componentes/Vendendor/Publicar/MensajeProducto";
import { SearchProvider } from "./Componentes/Comprador/Index/SearchContext";
import CarritoCompras from "./Componentes/Comprador/CarritoCompras/CarritoCompras";
import Historial from "./Componentes/Vendendor/Historial/Historial";

// Componente que decide si renderizar el Header y el Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = ["/Login", "/Registro", "/FormularioComprador", "/IndexVendedor/Publicar", "/IndexVendedor/VerPedidos", "/IndexVendedor/Historial"].includes(
    location.pathname,
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><IndexComprador /></Layout>} />
          <Route path="/FormularioComprador" element={<Layout><div className="form-container"><FormularioComprador /></div></Layout>} />
          <Route path="/CarritoCompras" element={<Layout><CarritoCompras /></Layout>} />
          <Route path="/Login" element={<Layout><Login /></Layout>} />
          <Route path="/Registro" element={<Layout><Form /></Layout>} />
          <Route path="/IndexVendedor" element={<Layout><IndexVendedor /></Layout>}>
            <Route path="Publicar" element={<Publicar />} />
            <Route path="VerPedidos" element={<VerPedidos />} />
            <Route path="Historial" element={<Historial />} />
          </Route>
          <Route path="/MensajeComprado" element={<Layout><MensajeComprado /></Layout>} />
          <Route path="/FormularioPago" element={<Layout><FormularioPago /></Layout>} />
          <Route path="/MensajeProducto" element={<Layout><MensajeProducto /></Layout>} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
