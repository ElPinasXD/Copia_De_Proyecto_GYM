import React, { useState, useEffect } from 'react';
import './Publicar.css';
import axios from 'axios';
import MensajeProducto from './MensajeProducto';

function Publicar() {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        image: null,
        description: '',
        region: '',
        type: '',
        quantity: '', // Campo de cantidad
    });
    const [, setErrors] = useState({});
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: type === 'file' ? files[0] : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.name) newErrors.name = 'Nombre es obligatorio';
        if (!formValues.price) newErrors.price = 'Precio es obligatorio';
        if (!formValues.image) newErrors.image = 'Imagen es obligatoria';
        if (!formValues.description) newErrors.description = 'Descripción es obligatoria';
        if (!formValues.region) newErrors.region = 'Región es obligatoria';
        if (!formValues.type) newErrors.type = 'Tipo de producto es obligatorio';
        if (!formValues.quantity) newErrors.quantity = 'Cantidad es obligatoria';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            const productData = {
                name: formValues.name,
                price: formValues.price,
                image: formValues.image.name, // Solo se almacena el nombre del archivo
                description: formValues.description,
                region: formValues.region,
                type: formValues.type,
                quantity: formValues.quantity,
                madeBy: username,
            };
    
            axios.post('http://localhost:3005/products', productData)
                .then(response => {
                    console.log('Producto creado:', response.data);
                    setIsMessageVisible(true);
                })
                .catch(error => {
                    console.error('Error al crear el producto:', error.response ? error.response.data : error.message);
                });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="container">
            {isMessageVisible ? (
                <MensajeProducto />
            ) : (
                <>
                    <h1 className="title">Ingrese datos del producto</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Ingrese el nombre del producto"
                                className="input"
                                value={formValues.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Precio</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Ingrese el precio del producto"
                                className="input"
                                value={formValues.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Cantidad</label>
                            <input
                                id="quantity"
                                type="number"
                                placeholder="Ingrese la cantidad del producto"
                                className="input"
                                value={formValues.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Imagen del producto</label>
                            <div className="upload-container">
                                <UploadIcon className="upload-icon" />
                                <p className="upload-text">Seleccionar archivo</p>
                                <input
                                    id="image"
                                    type="file"
                                    className="file-input"
                                    onChange={handleChange}
                                    accept=".jpg, .png"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <textarea
                                id="description"
                                placeholder="Ingrese la descripción del producto"
                                className="textarea"
                                value={formValues.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Región de origen</label>
                            <select
                                id="region"
                                className="select"
                                value={formValues.region}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Seleccione la región</option>
                                <option value="andina">Andina</option>
                                <option value="amazonica">Amazónica</option>
                                <option value="caribe">Caribe</option>
                                <option value="pacifica">Pacífica</option>
                                <option value="insular">Insular</option>
                                <option value="orinoquia">Orinoquia</option>
                                <option value="otra">Otra</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Tipo de producto</label>
                            <select
                                id="type"
                                className="select"
                                value={formValues.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Seleccione el tipo</option>
                                <option value="horneados">Horneados</option>
                                <option value="fritos">Fritos</option>
                                <option value="gelatinas">Gelatinas</option>
                                <option value="cremosos">Cremosos</option>
                                <option value="galletas">Galletas</option>
                                <option value="platosF">Platos Fríos</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-button">Publicar</button>
                    </form>
                </>
            )}
        </div>
    );
}

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
}

export default Publicar;
