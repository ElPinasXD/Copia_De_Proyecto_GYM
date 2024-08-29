import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => {
    // Cargar el carrito desde localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <SearchContext.Provider value={{ 
      searchTerm, 
      setSearchTerm, 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateCartItemQuantity 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);