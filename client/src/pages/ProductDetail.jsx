import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import productImages from "../constants/ProductsImages";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams(); //Obtenemos el ID Por URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://mystore-pxu1.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error al obtener producto:", err));
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-lg">Cargando...</div>;
  if (!product)
    return (
      <div className="text-center mt-20 text-red-500">
        Producto no encontrado
      </div>
    );

  return (
    <div className="product-card">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 transition-transform hover:scale-[1.02] duration-500">
        {/* Imagen del Producto */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
          <img
            src={
              productImages[product.name] ||
              `https://placehold.co/400x300?text=${encodeURIComponent(
                product.name
              )}&font=roboto`
            }
            alt={product.name}
            className="object-contain h-80 md:h-96"
          />
        </div>

        {/* Detalle del Producto */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cantidad disponible: {product.stock}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 shadow-lg transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
