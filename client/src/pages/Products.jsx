import { useEffect, useState, useContext } from "react";
import productImages from "../constants/ProductsImages.jsx";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

function Products({ search }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener productos:", err));
      window.scrollTo(0,0);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-900 dark:from-gray-900 min-h-screen py-12 px-4 transition-colors duration-500">
      <h1>Catálogo de Productos</h1>

      {/* Tarjetas de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {products
          .filter(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.category.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img
                  src={
                    productImages[product.name] ||
                    `https://placehold.co/300x200?text=${encodeURIComponent(
                      product.name
                    )}&font=roboto`
                  }
                  alt={product.name}
                  className="object-contain h-full"
                />
              </div>

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {product.name}
                </h2>

                {/* Categoria y Stock */}
                <div className="flex gap-2 mb-2">
                  <span className="bg-[#2c2721] text-[#f5d099] text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-[#f5d099] dark:text-[#2c2721]">
                    {product.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full 
                    ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                  >
                    {product.stock > 0 ? "En stock" : "Agotado"}
                  </span>
                </div>

                {/* Descripcion */}
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 line-clamp-3">
                  {product.description}
                </p>

                {/* Precio y Boton */}
                <div className="mt-3 sm:mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-[#513c2d] dark:text-[#f5d099]">
                    ${product.price}
                  </span>
                  <Link to={`/products/${product._id}`}>
                    <button className="btn-primary">Ver más</button>
                  </Link>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-primary"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}

        {/* En caso de no existir Productos */}
        {products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-300 text-lg font-medium">
            Oh no.!, No tenemos lo que Buscas 😢
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
