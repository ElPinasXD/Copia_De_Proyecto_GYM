import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./Componentes/Header/Header";
import Footer from "./Componentes/Footer/Footer";
import IndexComprador from "./Componentes/Comprador/Index/Index";
import FormularioComprador from "./Componentes/Comprador/Formulario/FormularioComprador";
import "./Componentes/Comprador/Formulario/Formulario.css";
import Login from "./Componentes/Login/Login";
import Form from "./Componentes/Registro/Form";
import IndexVendedor from "./Componentes/Vendendor/IndexVendedor";
import MensajeComprado from "./Componentes/Comprador/Formulario/MensajeComprado";
import FormularioPago from "./Componentes/Comprador/Formulario/FormularioPago";
import Publicar from "./Componentes/Vendendor/Publicar/Publicar";
import VerPedidos from "./Componentes/Vendendor/VerPedidos/VerPedidos";
import MensajeProducto from "./Componentes/Vendendor/Publicar/MensajeProducto";
import { SearchProvider } from "./Componentes/Comprador/Index/SearchContext"; // Asegúrate de la ruta correcta

// Componente que decide si renderizar el Header y el Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/registro", "/formulario"].includes(
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
    <SearchProvider> {/* Agrega SearchProvider aquí */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <IndexComprador />
              </Layout>
            }
          />
          <Route
            path="/formulario"
            element={
              <Layout>
                <div className="form-container">
                  <FormularioComprador />
                </div>
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/registro"
            element={
              <Layout>
                <Form />
              </Layout>
            }
          />
          <Route
            path="/IndexVendedor"
            element={
              <Layout>
                <IndexVendedor />
              </Layout>
            }
          />
          <Route
            path="/MensajeComprado"
            element={
              <Layout>
                <MensajeComprado />
              </Layout>
            }
          />
          <Route
            path="/FormularioPago"
            element={
              <Layout>
                <FormularioPago />
              </Layout>
            }
          />
          <Route path="/Publicar" element={<Layout><Publicar /></Layout>} />
          <Route path="/VerPedidos" element={<Layout><VerPedidos /> </Layout>} />
          <Route path="/MensajeProducto" element={<Layout><MensajeProducto /></Layout>} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
