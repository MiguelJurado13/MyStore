function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo Degradado */}
      <div
        className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Container */}
      <div className="relative z-10 max-w-sm w-full p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-white/20 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
