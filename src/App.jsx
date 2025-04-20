import { CategoryProvider } from "./contexts/CategoryContext";

import "./App.css";
import { Contacto } from "./pages/Contacto";
import { Extras } from "./pages/Extras";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Reservas } from "./pages/Reservas";

function App() {
  return (
    <>
      <CategoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CategoryProvider>
    </>
  );
}

export default App;
