import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import productImages from "../constants/ProductsImages.jsx";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useContext(CartContext);

  const [checkout, setCheckout] = useState(false);
  const [step, setStep] = useState(1); //El flujo es 1: Pago, 2: Resume, 3: Confirmacion
  const [paymentMethod, setPaymentMethod] = useState("card");

  //Si esta vacio devolvemos un texto
  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to white dark:from-gray-500 to-gray-800 p-4">
        <h1>Tu carrito esta Vacio.!</h1>
        <Link
          to={"/Products"}
          className="bg-[#2c2721] text-[#f5d099] dark:bg-[#f5d099] dark:text-[#2c2721] px-6 py-2 rounded-xl hover:bg-[#f5d099] hover:text-[#2c2721] dark:hover:text-[#f5d099] dark:hover:bg-[#2c2721] transition"
        >
          Agrega Productos.!
        </Link>
      </div>
    );

  //Si no esta vacio devolvemos el checkout
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <h1>Tu carrito:</h1>
      <div className="max-w-5x1 mx-auto flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={productImages[item.name] || "https://placehold.co/100x100"}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-xl bg-gray-100"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item._id)}
                className="bg gray-300 dark:bg-gray-600 dark:text-white px-3 py-1 rounded-lg hover:cursor-pointer"
              >
                <Minus size={22}></Minus>
              </button>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item._id)}
                className="bg-gray-300 dark:bg-gray-600 dark:text-white px-3 py-1 rounded-lg hover:cursor-pointer"
              >
                <Plus size={22}></Plus>
              </button>
            </div>

            <div className="flex gap-4 mt-2 sm:mt-0">
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-2xl">
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Total: ${cartTotal.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Vaciar Carrito
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCheckout(true)}
            className="bg-[#2c2721] text-white px-6 py-2 rounded-xl hover:bg-[#f5d099] dark:bg-[#f5d099] dark:text-[#2c2721] dark:hover:bg-[#2c2721] dark:hover:text-[#f5d099] transition"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout */}
      {checkout && (
        <div className="fixed inset-0 bg-[#f5d099] dark:bg-[#2c2721] opacity-90 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 mt-18 rounded-2xl shadow-lg max-w-sm text-center">
            {/* STEP 1 - METODO DE PAGO */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Metodo de pago
                </h2>

                <div className="flex gap-4 mb-6">
                  <button
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-800 text-blue-100"
                        : "border-gray-400 dark:border-gray-600 text-gray-600"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    💳 Tarjeta
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      paymentMethod === "paypal"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-100"
                        : "border-gray-400 dark:border-gray-600 text-gray-600"
                    }`}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    {" "}
                    🅿️ Paypal
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(2);
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Numero de Tarjeta"
                      required
                      className="w-full px-4 py-2 rounded-lg border-gray-600 dark:border-gray-700 dark:text-white"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        required
                        className="w-1/2 px-4 py-2 rounded-lg border-gray-600 dark:border-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        required
                        className="w-1/2 px-4 py-2 rounded-lg border-gray-600 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Nombre del Titular"
                      required
                      className="w-full px-4 py-2 rounded-lg border-gray-600 dark:border-gray-700 dark:text-white"
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                      Continuar
                    </button>
                  </form>
                )}

                {paymentMethod === "paypal" && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
                  >
                    Pagar con PayPal
                  </button>
                )}
              </div>
            )}

            {/* STEP 1 - RESUMEN DE COMPRA */}
            {step === 2 && (
              <div>
                <h2 className="text-2x1 font-bold text-gray-800 dark:text-gray-100">
                  Resumen de su compra:
                </h2>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            productImages[item.name] ||
                            "https://placehold.co/100x100"
                          }
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded-lg bg-gray-100"
                        />
                        <div>
                          <p className="text-gray-600 dark:text-gray-300 font-semibold">
                            {item.name}
                          </p>
                          <p className=" text-gray-600 dark:text-gray-300 text-sm">
                            {item.quantity} x ${item.price}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-800 dark:text-gray-100 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-[#f5d099]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setStep(3);
                    }}
                    className="mt-4 bg-[#2c2721] text-white px-6 py-2 rounded-xl hover:bg-[#f5d099] dark:bg-[#f5d099] dark:text-[#2c2721] dark:hover:bg-[#2c2721] dark:hover:text-[#f5d099] transition"
                  >
                    Confirmar Compra
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 - Confirmacion de Compra */}
            {step === 3 && (
              <div className="text-center text-gray-800 dark:text-white">
                <h2 className="text-2x1 font-bold mb-4">
                  Su pedido de ha realizado con Exito.!
                </h2>
                <p className="mb-6">Gracias por su Compra.</p>
                <button onClick={() => {clearCart(); setCheckout(false); setStep(1);}} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                  Volver al Catalogo
                </button>
              </div>
            )}

            {/* Boton Cancelar */}
            {step !== 3 && (
              <button
                onClick={() => setCheckout(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-red-500 text-white hover:bg-red-800 dark:bg-red-800 dark:text-white dark:hover:bg-red-500 dark:hover:text-white transition"
              >
                Cancelar Compra
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
