import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";
import N1 from "../assets/images/N1.png";
import N2 from "../assets/images/N2.png";
import N3 from "../assets/images/N3.png";
import N4 from "../assets/images/N4.png";
import SendFast from "../assets/fastSend.png";
import PaveSave from "../assets/savePay.png";
import Sup24_7 from "../assets/Sup24_7.png";
function Landing() {

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

  const benefits = [
    {
      title: "Envío Rápido",
      description:
        "Recibe tus productos en tiempo récord con nuestro servicio de envío rápido y seguro.",
      img: SendFast,
    },
    {
      title: "Pago Seguro",
      description:
        "Protege tu dinero con métodos de pago confiables y cifrados de última generación.",
      img: PaveSave,
    },
    {
      title: "Soporte 24/7",
      description:
        "Estamos disponibles todo el día, todos los días, para ayudarte con cualquier consulta.",
      img: Sup24_7,
    },
  ];

  return (
    <div className="text-gray-800 dark:text-gray-100">
      {/* Banner */}
      <section className="text-center py-20 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.h1
          className="text-5x1 md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Bienvenido a{" "}
          <span className="text-[#2c2721] dark:text-[#f5d099]">MyStore</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Todo lo que necesitas en un solo Lugar.!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to={"/Products"}
            className="px-6 py-3 bg-[#2c2721] text-[#f5d099] dark:bg-[#f5d099] dark:text-[#2c2721] rounded-xl shadow hover:bg-[#f5d099] hover:text-[#2c2721] hover:dark:bg-[#2c2721] hover:dark:text-[#f5d099] transition"
          >
            Explorar Catalogo
          </Link>
        </motion.div>
        <div className="mt-10">
          <img
            src={heroImg}
            alt="Hero MyStore"
            className="mx-auto max-h-96 rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Novedades */}
      <section className="text-center py-20 bg-white to-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-5xl font-bold text-center mb-20 tracking-tight text-[#2c2721] dark:text-[#f5d099]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Novedades
          </motion.h2>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[N1, N2, N3, N4].map((img, i) => (
              <motion.div
                key={i}
                className="group relative rounded-3xl overflow-hidden bg-gray-50 shadow-sm hover:shadow-xl transition-shadow duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={img}
                  alt={`Novedad ${i + 1}`}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-center p-6">
                    <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium shadow hover:shadow-md transition">
                      Ver más
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 space-y-24">
          {benefits.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
                viewport={{ once: true }}
              >
                {/* Imagen */}
                <div className="md:w-1/2">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl dark:shadow-gray-700"
                  />
                </div>

                {/* Texto */}
                <div className="md:w-1/2 text-center md:text-left space-y-4">
                  <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-20 text-center bg-gradient-to-b from-white to-blue-100 text-white dark:from-gray-800 dark:to-gray-800">
        <h2 className="text-4x1 font-bold mb-6 text-[#2c2721] dark:text-white">Explora lo Mejor de MyStore</h2>
        <Link
          to="/Products"
          className="px-8 py-4 bg-[#2c2721] text-[#f5d099] font-semibold rounded-xl shadow hover:bg-[#f5d099] hover:text-[#2c2721] transition"
        >
          Ver Catalogo
        </Link>
      </section>
    </div>
  );
}

export default Landing;
