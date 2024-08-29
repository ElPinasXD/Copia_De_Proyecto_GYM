import React, { useState } from "react";
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
  const { searchTerm, addToCart } = useSearch(); 
  const [typeFilter, setTypeFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState(""); 

  const products = [
    {
      id: 1,
      name: "Bocadillo de Guayaba",
      description: "Bocadillo de guayaba artesanal, elaborado con fruta fresca de los Andes y un toque de canela. Su textura suave y sabor intenso te transportarán a los campos colombianos.",
      price: "$1200",
      type: "Horneados",
      region: "Andina",
      vendor: "Dulces Andinos",
      image: BocadilloGuayaba,
      ingredients: ["Guayaba", "Azúcar", "Canela", "Clavo"],
      madeBy: "Dulces Andinos S.A.S."
    },
    {
      id: 2,
      name: "Arequipe Casero",
      description: "Arequipe hecho con leche fresca de la Amazonía y azúcar de caña. Su sabor intenso y cremosidad lo convierten en el acompañante perfecto para tus postres.",
      price: "$3000",
      type: "Cremosos",
      region: "Amazonica",
      vendor: "Sabores de la Selva",
      image: ArequipeCasero,
      ingredients: ["Leche fresca", "Azúcar de caña", "Vainilla"],
      madeBy: "Sabores de la Selva S.A.S."
    },
    {
      id: 3,
      name: "Dulce de Mora",
      description: "Dulce de mora hecho con moras silvestres del Caribe y un toque de limón. Su sabor agridulce y textura jugosa te conquistarán.",
      price: "$2100",
      type: "Gelatinas",
      region: "Caribe",
      vendor: "Dulces Caribeños",
      image: DulceMora,
      ingredients: ["Moras", "Azúcar", "Limón", "Pectina"],
      madeBy: "Dulces Caribeños S.A.S."
    },
    {
      id: 4,
      name: "Panelitas de Maíz",
      description: "Deliciosas panelitas de maíz, elaboradas con maíz tierno y panela orgánica. Su sabor dulce y textura suave las hacen irresistibles.",
      price: "$3200",
      type: "Horneados",
      region: "Pacifica",
      vendor: "Dulces del Pacífico",
      image: PanelitasMaíz,
      ingredients: ["Maíz tierno", "Panela", "Sal"],
      madeBy: "Dulces del Pacífico S.A.S."
    },
    {
      id: 5,
      name: "Arequipe",
      description: "Arequipe tradicional colombiano, hecho con leche fresca y azúcar. Su sabor dulce y cremoso es perfecto para cualquier ocasión.",
      price: "$3700",
      type: "Cremosos",
      region: "Insular",
      vendor: "La Lechería",
      image: Arequipe,
      ingredients: ["Leche fresca", "Azúcar", "Bicarbonato de sodio"],
      madeBy: "La Lechería S.A.S."
    },
    {
      id: 6,
      name: "Cocadas",
      description: "Cocadas hechas con coco rallado fresco y azúcar. Su sabor dulce y textura crujiente las hacen una delicia.",
      price: "$2200",
      type: "Fritos",
      region: "Orinoquia",
      vendor: "Coco Loco",
      image: Cocadas,
      ingredients: ["Coco rallado", "Azúcar", "Huevo"],
      madeBy: "Coco Loco S.A.S."
    },
    {
      id: 7,
      name: "Manjar Blanco",
      description: "Manjar blanco artesanal, elaborado con leche fresca y azúcar. Su textura suave y sabor dulce lo convierten en un postre irresistible.",
      price: "$2600",
      type: "Cremosos",
      region: "Andina",
      vendor: "Dulces de la Abuela",
      image: ManjarBlanco,
      ingredients: ["Leche fresca", "Azúcar", "Canela"],
      madeBy: "Dulces de la Abuela S.A.S."
    },
    {
      id: 8,
      name: "Panelitas",
      description: "Panelitas hechas con panela orgánica y leche de coco. Su sabor dulce y textura suave las hacen perfectas para cualquier ocasión.",
      price: "$1900",
      type: "Horneados",
      region: "Amazonica",
      vendor: "Sabores de la Tierra",
      image: Panelitas,
      ingredients: ["Panela", "Leche de coco", "Vainilla"],
      madeBy: "Sabores de la Tierra S.A.S."
    },
    {
      id: 9,
      name: "Buñuelos",
      description: "Buñuelos tradicionales colombianos, hechos con harina, queso, huevo y sal. Su sabor salado y textura crujiente los hacen perfectos para compartir.",
      price: "$2000",
      type: "Fritos",
      region: "Caribe",
      vendor: "Sabores del Caribe",
      image: Buñuelos,
      ingredients: ["Harina", "Queso", "Huevo", "Sal", "Levadura"],
      madeBy: "Sabores del Caribe S.A.S."
    },
    {
      id: 10,
      name: "Natilla",
      description: "Natilla colombiana, hecha con leche, maicena, azúcar y canela. Su sabor dulce y textura cremosa la hacen un postre clásico.",
      price: "$2500",
      type: "Cremosos",
      region: "Pacifica",
      vendor: "La Lechería",
      image: Natilla,
      ingredients: ["Leche", "Maicena", "Azúcar", "Canela"],
      madeBy: "La Lechería S.A.S."
    }
  ];

  const getFilteredProducts = () => {
    return products.filter((product) => {
      // Asegúrate de que product.name esté definido y sea una cadena
      const productName = product.name ? product.name.toLowerCase() : "";
  
      const matchesType = typeFilter === "" || product.type === typeFilter;
      const matchesRegion = regionFilter === "" || product.region === regionFilter;
      const matchesPrice = priceFilter === "" ||
        (priceFilter === "Menos de $2000" && parseInt(product.price.slice(1)) < 2000) ||
        (priceFilter === "$2100 - $4900" &&
          parseInt(product.price.slice(1)) >= 2100 &&
          parseInt(product.price.slice(1)) <= 4900) ||
        (priceFilter === "Más de $5100" && parseInt(product.price.slice(1)) > 5100);
  
      const matchesVendor = vendorFilter === "" || product.vendor === vendorFilter;
  
      // Maneja el caso en que searchTerm pueda ser undefined
      const searchLower = searchTerm ? searchTerm.toLowerCase() : "";
  
      const matchesSearchTerm = searchLower === "" || productName.includes(searchLower);
  
      return matchesType && matchesRegion && matchesPrice && matchesSearchTerm && matchesVendor;
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
            <select
              className="filterDropdownUnique"
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
            >
              <option value="">Vendedores</option>
              <option value="Dulces Andinos">Dulces Andinos</option>
              <option value="Sabores de la Selva">Sabores de la Selva</option>
              <option value="Dulces Caribeños">Dulces Caribeños</option>
              <option value="Dulces del Pacífico">Dulces del Pacífico</option>
              <option value="La Lechería">La Lechería</option>
              <option value="Coco Loco">Coco Loco</option>
            </select>
          </div>
        </div>
      </header>

      <div className="itemShowcaseUnique">
        {filteredProducts.length === 0 ? (
          <h2>No hay ningún producto que cumpla con esas especificaciones</h2>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`itemCardUnique ${isExpanded ? "expanded" : ""}`}>
      <img src={product.image} alt={`Producto ${product.id}`} className="itemImageUnique" />
      <div className="itemDetailsUnique">
        <h3 className="itemTitleUnique">{product.name}</h3>
        <p className="itemDescriptionUnique">{product.description}</p>
        {isExpanded && (
          <div className="expandedInfoUnique">
            <p><strong>Ingredientes:</strong></p>
            <ul className="ingredientListUnique">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p><strong>Región:</strong> {product.region}</p>
            <p><strong>Hecho por:</strong> {product.madeBy}</p>
            <div className="itemActionsUnique">
              <span className="itemPriceUnique">Precio: {product.price}</span>
              <button onClick={() => onAddToCart(product)} className="purchaseButtonUnique">
                Añadir al Carrito
              </button>
            </div>
          </div>
        )}
      </div>
      <button onClick={toggleExpand} className="expandButtonUnique">
        {isExpanded ? "˄" : "˅"}
      </button>
    </div>
  );
}

export default IndexComprador;