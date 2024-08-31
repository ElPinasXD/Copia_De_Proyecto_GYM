import React, { useState, useEffect } from "react";
import "./Index.css";
import { useSearch } from "./SearchContext";
import axios from "axios";

function ProductCard({ product, onAddToCart }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`itemCardUnique ${isExpanded ? "expanded" : ""}`}>
      <img
        src={`http://localhost:3005/images/${product.image}`}
        alt={`Producto ${product.id}`}
        className="itemImageUnique"
      />
      <div className="itemDetailsUnique">
        <h3 className="itemTitleUnique">{product.name}</h3>
        <p className="itemDescriptionUnique">{product.description}</p>
        <p><strong>Hecho por:</strong> {product.madeBy}</p>
        <p style={{ marginBottom: '30px' }}>
          <strong className="Cantidad">Cantidad: </strong>
          {product.quantity > 0 ? product.quantity : <span className="outOfStock">Agotado</span>}
        </p>
        {isExpanded && (
          <div className="expandedInfoUnique">
            <p><strong>Región:</strong> {product.region}</p>
            <div className="itemActionsUnique">
              <span className="itemPriceUnique">Precio: {product.price}</span>
              <button
                onClick={() => onAddToCart(product)}
                className="purchaseButtonUnique"
                disabled={product.quantity === 0}
              >
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

function IndexComprador() {
  const { searchTerm, addToCart } = useSearch();
  const [products, setProducts] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [vendors, setVendors] = useState([]);

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = () => {
        axios.get("http://localhost:3005/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los productos:", error);
            });
    };

    fetchProducts(); // Cargar productos inicialmente

    // Actualizar productos cada 30 segundos
    const intervalId = setInterval(fetchProducts, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
}, []);

  // Cargar nombres de vendedores desde la API
  useEffect(() => {
    axios.get("http://localhost:3005/Vendedor")
      .then(response => {
        const vendorNames = response.data.map(v => v.Usuario);
        console.log("Vendedores cargados:", vendorNames);
        setVendors(vendorNames);
      })
      .catch(error => {
        console.error("Error al obtener los vendedores:", error);
      });
  }, []);
  
  // En getFilteredProducts
  console.log("Filtro de vendedor:", vendorFilter);
  console.log("Producto madeBy:", products.madeBy);

  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesType = typeFilter === "" || product.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesRegion = regionFilter === "" || product.region.toLowerCase() === regionFilter.toLowerCase();
      
      const price = parseInt(product.price);
      const matchesPrice = priceFilter === "" ||
        (priceFilter === "Menos de $2000" && price < 2000) ||
        (priceFilter === "$2100 - $4900" && price >= 2100 && price <= 4900) ||
        (priceFilter === "Más de $5100" && price > 5100);

      const matchesVendor = vendorFilter === "" || product.madeBy.toLowerCase() === vendorFilter.toLowerCase();

      const searchLower = searchTerm ? searchTerm.toLowerCase() : "";
      const matchesSearchTerm = searchLower === "" || product.name.toLowerCase().includes(searchLower);

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
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor}>{vendor}</option>
              ))}
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

export default IndexComprador;
