import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Index.css"; // Importa el archivo de estilos

import ManjarBlanco from '../../../assets/images/549936eba4d64d3bfe7f905b0a2bbc1a.jpg';
import BocadilloGuayaba from '../../../assets/images/bocadillo_de_guayaba.jpg';
import PanelitasMaíz from '../../../assets/images/hq720.jpg';
import Arequipe from '../../../assets/images/images (1).jpg';
import Cocadas from '../../../assets/images/images (2).jpg';
import Buñuelos from '../../../assets/images/images (3).jpg';
import Natilla from '../../../assets/images/images (4).jpg';
import DulceMora from '../../../assets/images/images.jpg';
import Panelitas from '../../../assets/images/receta-para-preparar-panelitas-de-leche-colombianas-1122984.jpg';
import ArequipeCasero from '../../../assets/images/RV2UGXYKRREGTLRYXX5LYEXFUU.jpg';



function IndexComprador() {
  const navigate = useNavigate();

 const handleFormComprador = () => {
  navigate('/formulario')
 }
  return (
    <div className="mainWrapperUnique">
      <header className="headerNimbusUnique">
        <h1 className="headerMainTitleUnique">Nuestros Productos</h1>
        <div className="filterAreaUnique">
          <label className="filterPromptUnique">Filtrar por:</label>
          <div className="filterDropdownsUnique">
            <select className="filterDropdownUnique">
              <option value="" disabled selected>
                Tipo
              </option>
              <option value="tipo1">Horneados</option>
              <option value="tipo2">Fritos</option>
              <option value="tipo3">Gelatinas</option>
              <option value="tipo4">Cremosos</option>
              <option value="tipo5">Galletas</option>
              <option value="tipo6">Frios</option>
            </select>
            <select className="filterDropdownUnique">
              <option value="" disabled selected>
                Región
              </option>
              <option value="region1">Andina</option>
              <option value="region2">Amazonica</option>
              <option value="region3">Caribe</option>
              <option value="region4">Pacifica</option>
              <option value="region5">Otra</option>
            </select>
            <select className="filterDropdownUnique">
              <option value="" disabled selected>
                Precio
              </option>
              <option value="precio1">Menos de $2000</option>
              <option value="precio2">$2100 - $4900</option>
              <option value="precio3">Más de $5100</option>
            </select>
          </div>
        </div>
      </header>
      <div className="itemShowcaseUnique">
        {[
          {
            id: 1,
            name: "Bocadillo de Guayaba",
            description:
              "Delicioso bocadillo de guayaba, hecho con fruta fresca y azúcar.",
            price: "$1200",
            image: BocadilloGuayaba,
          },
          {
            id: 2,
            name: "Arequipe Casero",
            description: "Delicioso arequipe hecho con leche fresca y azúcar.",
            price: "$3000",
            image: ArequipeCasero,
          },
          {
            id: 3,
            name: "Dulce de Mora",
            description:
              "Delicioso dulce de mora, hecho con fruta fresca y azúcar.",
            price: "$2100",
            image: DulceMora,
          },
          {
            id: 4,
            name: "Panelitas de Maíz",
            description: "Deliciosas panelitas de maíz.",
            price: "$3200",
            image: PanelitasMaíz,
          },
          {
            "id": 5,
            "name": "Arequipe",
            "description": "Delicioso dulce hecho con leche y azúcar.",
            "price": "$1600",
            "image": Arequipe,
          },
          {
            "id": 6,
            "name": "Cocadas",
            "description": "Dulce de coco rallado, azúcar y huevo.",
            "price": "$1800",
            "image": Cocadas,
          },
          {
            "id": 7,
            "name": "Manjar Blanco",
            "description": "Dulce de leche con azúcar y canela.",
            "price": "$2200",
            "image": ManjarBlanco,
          },
          {
            "id": 8,
            "name": "Panelitas",
            "description": "Deliciosas panelitas hechas con panela, leche y coco rallado.",
            "price": "$1900",
            "image": Panelitas,
          },
          {
            "id": 9,
            "name": "Buñuelos",
            "description": "Dulce frito de harina, queso, huevo y sal.",
            "price": "$1700",
            "image":  Buñuelos,
          },
          {
            "id": 10,
            "name": "Natilla",
            "description": "Postre cremoso de leche, maicena, azúcar y canela.",
            "price": "$2000",
            "image": Natilla,
          },
        ].map((product) => (
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
                <button onClick={handleFormComprador} className="purchaseButtonUnique">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexComprador;
