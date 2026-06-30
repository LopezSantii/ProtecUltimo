import React, { createContext, useContext, useState, useEffect } from 'react';

    const CartContext = createContext();

    export const useCart = () => useContext(CartContext);

    export const CartProvider = ({ children }) => {
        const [cartItems, setCartItems] = useState(() => {
            try {
                const localData = localStorage.getItem('cartItems');
                return localData ? JSON.parse(localData) : [];
            } catch (error) {
                console.error("Could not parse cart items from localStorage", error);
                return [];
            }
        });

        useEffect(() => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }, [cartItems]);

        const addToCart = (product) => {
            setCartItems(prevItems => {
                const itemIdentifier = product.selectedColor ? product.selectedColor : 'default';
                const existingItem = prevItems.find(
                    item => item.id === product.id && (item.selectedColor || 'default') === itemIdentifier
                );

                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === product.id && (item.selectedColor || 'default') === itemIdentifier
                            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                            : item
                    );
                } else {
                    return [...prevItems, { ...product, quantity: product.quantity || 1 }];
                }
            });
        };

        const removeFromCart = (productId, selectedColor) => {
            setCartItems(prevItems => {
                const itemIdentifier = selectedColor || 'default';
                return prevItems.filter(
                    item => !(item.id === productId && (item.selectedColor || 'default') === itemIdentifier)
                );
            });
        };

        const updateQuantity = (productId, newQuantity, selectedColor) => {
            if (newQuantity < 1) {
                removeFromCart(productId, selectedColor);
                return;
            }
            setCartItems(prevItems => {
                const itemIdentifier = selectedColor || 'default';
                return prevItems.map(item =>
                    item.id === productId && (item.selectedColor || 'default') === itemIdentifier
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            });
        };

        const clearCart = () => {
            setCartItems([]);
        };

        const value = {
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        };

        return (
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        );
    };