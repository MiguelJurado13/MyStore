import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    //Recuperar el carrito en localStorage
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //Buscar carrito en Local al actualizar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Agregar producto a Carrito
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  //Quitar de Carrito
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  //Limpiar Carrito
  const clearCart = () => setCart([]);

  //Agregar Cantidad de Producto
  const increaseQuantity = (id) => {
    setCart((prev) => 
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1} : item));
  };

  //Quitar Cantidad de Producto
  const decreaseQuantity = (id) => {
    setCart((prev) => 
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item 
          )
          .filter((item) => item.quantity > 0)
        );
  };

  //Total de Carrito
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0 );

  //Total de Productos
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
