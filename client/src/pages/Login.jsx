import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import DayLogin from "../assets/images/DayLogin.png";
import DarkLogin from "../assets/images/DarkLogin.png";
import GoogleImg from "../assets/images/google.png";
import OutlookImg from "../assets/images/outlook.png";

function Login({ darkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      setModal({
        isOpen: true,
        title: isRegister ? "Registro Exitoso!" : "Login Exitoso!",
        message: isRegister
          ? "Bienvenido! Tu cuenta fue creada exitosamente."
          : "Disfruta de tus Beneficios y Descuentos en MyStore!",
      });
      setTimeout(() => {
        setModal({ isOpen: false, title: "", message: "" });
        navigate("/Products");
      }, 2500);
    } else {
      setModal({
        isOpen: true,
        title: "No se puede Iniciar Sesion",
        message: "Rellena los campos requeridos.",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Fondo */}
      <div
        className="absolute inset-0 py-96 bg-cover bg-center dark:hidden"
        style={{ backgroundImage: `url(${DayLogin})` }}
      ></div>
      <div
        className="absolute inset-0 py-96 bg-cover bg-center hidden dark:block"
        style={{ backgroundImage: `url(${DarkLogin})` }}
      ></div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isRegister ? "register" : "login"}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl
                     bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
            {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                size={20}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/30
                           bg-white/40 dark:bg-gray-700/40 backdrop-blur-md
                           focus:ring-2 focus:ring-blue-600 focus:outline-none
                           text-gray-900 dark:text-gray-100 placeholder-gray-500
                           text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                size={20}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/30
                           bg-white/40 dark:bg-gray-700/40 backdrop-blur-md
                           focus:ring-2 focus:ring-blue-600 focus:outline-none
                           text-gray-900 dark:text-gray-100 placeholder-gray-500
                           text-sm sm:text-base"
              />
            </div>

            {isRegister && (
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/30
                             bg-white/40 dark:bg-gray-700/40 backdrop-blur-md
                             focus:ring-2 focus:ring-blue-600 focus:outline-none
                             text-gray-900 dark:text-gray-100 placeholder-gray-500
                             text-sm sm:text-base"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white
                         shadow-md shadow-blue-500/30 transition-colors duration-300 text-sm sm:text-base"
            >
              {isRegister ? "Registrarse" : "Entrar"}
            </button>

            <p className="mt-2 text-center text-gray-900 dark:text-gray-100 text-sm sm:text-base">
              Creala con
            </p>
          </form>

          {/* Opciones sociales solo en registro */}
          {isRegister && (
            <div className="mt-4 flex justify-center space-x-4">
              {/* Google */}
              <button
                className="w-16 h-16 flex items-center justify-center rounded-full 
                       bg-white dark:bg-gray-700 hover:scale-105 transition-transform"
              >
                <img
                  src={GoogleImg}
                  alt="Google"
                  className="w-10 h-10 object-contain"
                />
              </button>

              {/* Outlook */}
              <button
                className="w-16 h-16 flex items-center justify-center rounded-full 
                       bg-white dark:bg-gray-700 hover:scale-105 transition-transform"
              >
                <img
                  src={OutlookImg}
                  alt="Outlook"
                  className="w-10 h-10 object-contain"
                />
              </button>
            </div>
          )}

          {/* Toggle */}
          <p className="mt-6 text-center text-gray-800 dark:text-gray-400 text-sm sm:text-base">
            {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Iniciar Sesión" : "Regístrate"}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, title: "", message: "" })}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}

export default Login;
