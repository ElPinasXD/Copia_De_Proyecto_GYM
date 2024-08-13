import React from "react";
import "./Index.css"; // Importa el archivo de estilos

function IndexComprador() {
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
            image: "/placeholder.svg",
          },
          {
            id: 2,
            name: "Arequipe Casero",
            description: "Delicioso arequipe hecho con leche fresca y azúcar.",
            price: "$3000",
            image: "/placeholder.svg",
          },
          {
            id: 3,
            name: "Dulce de Mora",
            description:
              "Delicioso dulce de mora, hecho con fruta fresca y azúcar.",
            price: "$2100",
            image: "/placeholder.svg",
          },
          {
            id: 4,
            name: "Panelitas de Maíz",
            description: "Deliciosas panelitas de maíz.",
            price: "$3200",
            image: "/placeholder.svg",
          },
          {
            "id": 5,
            "name": "Arequipe",
            "description": "Delicioso dulce hecho con leche y azúcar.",
            "price": "$1600",
            "image": "/placeholder.svg"
          },
          {
            "id": 6,
            "name": "Cocadas",
            "description": "Dulce de coco rallado, azúcar y huevo.",
            "price": "$1800",
            "image": "/placeholder.svg"
          },
          {
            "id": 7,
            "name": "Manjar Blanco",
            "description": "Dulce de leche con azúcar y canela.",
            "price": "$2200",
            "image": "/placeholder.svg"
          },
          {
            "id": 8,
            "name": "Panelitas",
            "description": "Deliciosas panelitas hechas con panela, leche y coco rallado.",
            "price": "$1900",
            "image": "/placeholder.svg"
          },
          {
            "id": 9,
            "name": "Buñuelos",
            "description": "Dulce frito de harina, queso, huevo y sal.",
            "price": "$1700",
            "image": "/placeholder.svg"
          },
          {
            "id": 10,
            "name": "Natilla",
            "description": "Postre cremoso de leche, maicena, azúcar y canela.",
            "price": "$2000",
            "image": "/placeholder.svg"
          },
          {
            "id": 11,
            "name": "Arroz con Leche",
            "description": "Arroz cocido con leche, azúcar y canela.",
            "price": "$2100",
            "image": "/placeholder.svg"
          },
          {
            "id": 12,
            "name": "Merengón",
            "description": "Dulce de claras de huevo y azúcar.",
            "price": "$1500",
            "image": "/placeholder.svg"
          },
          {
            "id": 13,
            "name": "Rosca de Reyes",
            "description": "Pan dulce con harina, levadura, huevos, azúcar y frutas confitadas.",
            "price": "$2500",
            "image": "/placeholder.svg"
          },
          {
            "id": 14,
            "name": "Empanadas Dulces",
            "description": "Empanadas rellenas de queso y azúcar.",
            "price": "$1900",
            "image": "/placeholder.svg"
          },
          {
            "id": 15,
            "name": "Miel de Panela",
            "description": "Miel elaborada a partir de jugo de caña de azúcar.",
            "price": "$1600",
            "image": "/placeholder.svg"
          },
          {
            "id": 16,
            "name": "Quesillo",
            "description": "Dulce de leche, huevos y azúcar.",
            "price": "$1750",
            "image": "/placeholder.svg"
          },
          {
            "id": 17,
            "name": "Carimañolas Dulces",
            "description": "Dulce hecho con yuca, queso y azúcar.",
            "price": "$2200",
            "image": "/placeholder.svg"
          },
          {
            "id": 18,
            "name": "Encocado de Pescado con Arroz con Coco",
            "description": "Pescado en salsa de coco con arroz.",
            "price": "$2800",
            "image": "/placeholder.svg"
          },
          {
            "id": 19,
            "name": "Chicha",
            "description": "Bebida fermentada de maíz.",
            "price": "$1500",
            "image": "/placeholder.svg"
          },
          {
            "id": 20,
            "name": "Dulces de Frutas",
            "description": "Dulces variados de mango, papaya y maracuyá.",
            "price": "$1800",
            "image": "/placeholder.svg"
          },
          {
            "id": 21,
            "name": "Pastel de Yuca",
            "description": "Pastel dulce hecho con yuca, queso y azúcar.",
            "price": "$2000",
            "image": "/placeholder.svg"
          },
          {
            "id": 22,
            "name": "Halo Halo",
            "description": "Postre de hielo raspado con leche condensada y frutas.",
            "price": "$2200",
            "image": "/placeholder.svg"
          },
          {
            "id": 23,
            "name": "Cocada de Piña",
            "description": "Cocada hecha con piña, coco rallado y azúcar.",
            "price": "$1900",
            "image": "/placeholder.svg"
          },
          {
            "id": 24,
            "name": "Jugo de Frutas Exóticas",
            "description": "Jugo hecho con açaí, camu camu y cocona.",
            "price": "$2100",
            "image": "/placeholder.svg"
          },
          {
            "id": 25,
            "name": "Dulces de Yuca",
            "description": "Dulces hechos de yuca y azúcar.",
            "price": "$1700",
            "image": "/placeholder.svg"
          },
          {
            "id": 26,
            "name": "Mazamorra",
            "description": "Dulce de maíz con leche y azúcar.",
            "price": "$2000",
            "image": "/placeholder.svg"
          },
          {
            "id": 27,
            "name": "Cocada de Yuca",
            "description": "Dulce de yuca con coco rallado y azúcar.",
            "price": "$1800",
            "image": "/placeholder.svg"
          },
          {
            "id": 28,
            "name": "Bocadillo de Guayaba",
            "description": "Dulce típico de guayaba y azúcar.",
            "price": "$1500",
            "image": "/placeholder.svg"
          },
          {
            "id": 29,
            "name": "Chorizos Dulces",
            "description": "Chorizos hechos con carne de cerdo, azúcar y especias.",
            "price": "$2000",
            "image": "/placeholder.svg"
          },
          {
            "id": 30,
            "name": "Miel de Caña",
            "description": "Miel elaborada a partir de jugo de caña de azúcar.",
            "price": "$1800",
            "image": "/placeholder.svg"
          },
          {
            "id": 31,
            "name": "Dulces de Frutas Cristalizadas",
            "description": "Dulces de higos, brevas y papaya cristalizados.",
            "price": "$2200",
            "image": "/placeholder.svg"
          },
          {
            "id": 32,
            "name": "Turrones",
            "description": "Dulces de almendras, miel y azúcar.",
            "price": "$2000",
            "image": "/placeholder.svg"
          },
          {
            "id": 33,
            "name": "Queso Costeño",
            "description": "Queso típico de la costa Caribe colombiano.",
            "price": "$2100",
            "image": "/placeholder.svg"
          },
          {
            "id": 34,
            "name": "Mermeladas Artesanales",
            "description": "Mermeladas preparadas con frutas variadas.",
            "price": "$1900",
            "image": "/placeholder.svg"
          }
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
                <button className="purchaseButtonUnique">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexComprador;
