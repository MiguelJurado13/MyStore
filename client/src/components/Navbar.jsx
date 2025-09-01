import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { CartContext } from "../context/CartContext";

function Navbar({ darkMode, toggleDarkMode, search, setSearch }) {
  const location = useLocation();
  const isCatalog = location.pathname === "/Products";
  const { totalItems } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            MyStore
          </Link>

          {/* Buscador */}
          {isCatalog && (
            <div className="hidden sm:flex flex-1 mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Encuentra lo que buscas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-blue-600 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              </div>
            </div>
          )}

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Novedades
            </Link>
            <Link to="/Products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Catálogo
            </Link>
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <User size={22} />
            </Link>

            {/* Dark Mode */}
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200 text-lg">
              {darkMode ? "🌤️" : "🌙"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-2 shadow-md">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Novedades
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Catálogo
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative">
            Carrito {totalItems > 0 && <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full inline-flex items-center justify-center">{totalItems}</span>}
          </Link>
          <Link to="/Login" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Login
          </Link>
          <button onClick={() => { toggleDarkMode(); setIsOpen(false); }} className="block text-gray-700 dark:text-gray-200 mt-2">
            {darkMode ? "🌤️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>

          {/* Buscador móvil */}
          {isCatalog && (
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Encuentra lo que Buscas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5"
              />
            </div>
          </div>
        )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
