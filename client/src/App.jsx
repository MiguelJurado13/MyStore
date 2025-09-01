import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./pages/Cart.jsx";
import Login from './pages/login.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  //Modo oscuro
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-b from-gray-100 to-gray-900 dark:from-gray-900 min-h-screen py-10 transition-colors duration-500">
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} search={search} setSearch={setSearch}/>
          <Routes>
            <Route path="/" element={<Landing darkMode={darkMode} />}></Route>
            <Route path="/products" element={<Products darkMode={darkMode} search={search}/>} />
            <Route
              path="/products/:id"
              element={<ProductDetail darkMode={darkMode} />}
            />
            <Route path="/Cart" element={<Cart darkMode={darkMode} />}/>
            <Route path="/Login" element={<Login darkMode={darkMode} />}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
