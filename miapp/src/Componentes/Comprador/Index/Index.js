import React from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css"; // Importa el archivo de estilos
import { useSearch } from "./SearchContext"; 

import ManjarBlanco from "../../../assets/images/549936eba4d64d3bfe7f905b0a2bbc1a.jpg";
import BocadilloGuayaba from "../../../assets/images/bocadillo_de_guayaba.jpg";
import PanelitasMaíz from "../../../assets/images/hq720.jpg";
import Arequipe from "../../../assets/images/images (1).jpg";
import Cocadas from "../../../assets/images/images (2).jpg";
import Buñuelos from "../../../assets/images/images (3).jpg";
import Natilla from "../../../assets/images/images (4).jpg";
import DulceMora from "../../../assets/images/images.jpg";
import Panelitas from "../../../assets/images/receta-para-preparar-panelitas-de-leche-colombianas-1122984.jpg";
import ArequipeCasero from "../../../assets/images/RV2UGXYKRREGTLRYXX5LYEXFUU.jpg";

function IndexComprador() {
  const navigate = useNavigate();
  const { searchTerm, addToCart } = useSearch(); // Obtener el término de búsqueda desde el contexto

  const [typeFilter, setTypeFilter] =  React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const [priceFilter, setPriceFilter] = React.useState("");

  const products = [
    { id: 1, name: "Bocadillo de Guayaba", description: "Delicioso bocadillo de guayaba, hecho con fruta fresca y azúcar.", price: "$1200", type: "Horneados", region: "Andina", image: BocadilloGuayaba },
    { id: 2, name: "Arequipe Casero", description: "Delicioso arequipe hecho con leche fresca y azúcar.", price: "$3000", type: "Cremosos", region: "Amazonica", image: ArequipeCasero },
    { id: 3, name: "Dulce de Mora", description: "Delicioso dulce de mora, hecho con fruta fresca y azúcar.", price: "$2100", type: "Gelatinas", region: "Caribe", image: DulceMora },
    { id: 4, name: "Panelitas de Maíz", description: "Deliciosas panelitas de maíz.", price: "$3200", type: "Horneados", region: "Pacifica", image: PanelitasMaíz },
    { id: 5, name: "Arequipe", description: "Delicioso dulce hecho con leche y azúcar.", price: "$3700", type: "Cremosos", region: "Insular", image: Arequipe },
    { id: 6, name: "Cocadas", description: "Dulce de coco rallado, azúcar y huevo.", price: "$2200", type: "Fritos", region: "Orinoquia", image: Cocadas },
    { id: 7, name: "Manjar Blanco", description: "Dulce de leche con azúcar y canela.", price: "$2600", type: "Cremosos", region: "Andina", image: ManjarBlanco },
    { id: 8, name: "Panelitas", description: "Deliciosas panelitas hechas con panela, leche y coco rallado.", price: "$1900", type: "Horneados", region: "Amazonica", image: Panelitas },
    { id: 9, name: "Buñuelos", description: "Dulce frito de harina, queso, huevo y sal.", price: "$2000", type: "Fritos", region: "Caribe", image: Buñuelos },
    { id: 10, name: "Natilla", description: "Postre cremoso de leche, maicena, azúcar y canela.", price: "$2500", type: "Cremosos", region: "Pacifica", image: Natilla },
  ];

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesType = typeFilter === "" || product.type === typeFilter;
      const matchesRegion = regionFilter === "" || product.region === regionFilter;
      const matchesPrice = priceFilter === "" ||
        (priceFilter === "Menos de $2000" && parseInt(product.price.slice(1)) < 2000) ||
        (priceFilter === "$2100 - $4900" &&
          parseInt(product.price.slice(1)) >= 2100 &&
          parseInt(product.price.slice(1)) <= 4900) ||
        (priceFilter === "Más de $5100" && parseInt(product.price.slice(1)) > 5100);

      const matchesSearchTerm = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesRegion && matchesPrice && matchesSearchTerm;
    });
  };

  const filteredProducts = getFilteredProducts();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="mainWrapperUnique">
      <header className="headerNimbusUnique">
        <h1 className="headerMainTitleUnique">Nuestros Productos</h1>
        <div className="filterAreaUnique">
          <label className="filterPromptUnique">Filtrar por:</label>
          <div className="filterDropdownsUnique">
            <select
              className="filterDropdownUnique"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Tipo</option>
              <option value="Horneados">Horneados</option>
              <option value="Fritos">Fritos</option>
              <option value="Gelatinas">Gelatinas</option>
              <option value="Cremosos">Cremosos</option>
              <option value="Galletas">Galletas</option>
              <option value="Platos Frios">Platos Frios</option>
            </select>
            <select
              className="filterDropdownUnique"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="">Región</option>
              <option value="Andina">Andina</option>
              <option value="Amazonica">Amazonica</option>
              <option value="Caribe">Caribe</option>
              <option value="Pacifica">Pacifica</option>
              <option value="Insular">Insular</option>
              <option value="Orinoquia">Orinoquia</option>
              <option value="Otra">Otra</option>
            </select>
            <select
              className="filterDropdownUnique"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Precio</option>
              <option value="Menos de $2000">Menos de $2000</option>
              <option value="$2100 - $4900">$2100 - $4900</option>
              <option value="Más de $5100">Más de $5100</option>
            </select>
            
          </div>
        </div>
      </header>
      <div className="itemShowcaseUnique">
        {filteredProducts.length === 0 ? (
          <h2>No hay ningun producto que cumpla con esas especificaciones</h2>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="itemCardUnique">
              <img
                src={product.image}
                alt={`Producto ${product.id}`}
                className="itemImageUnique"
              />
              <div className="itemDetailsUnique">
                <h3 className="itemTitleUnique">{product.name}</h3>
                <p className="itemDescriptionUnique">{product.description}</p>
                <div className="itemActionsUnique">
                  <span className="itemPriceUnique">{product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="purchaseButtonUnique"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default IndexComprador;
