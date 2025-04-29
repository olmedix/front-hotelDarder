import { CategoryProvider } from "./contexts/CategoryContext";
import { HotelProvider } from "./contexts/HotelContext";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";
import { Contacto } from "./pages/Contacto";
import { Extras } from "./pages/Extras";
import { Home } from "./pages/Home";
import { Reservas } from "./pages/Reservas";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { RegisterLogin } from "./pages/RegisterLogin";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <HotelProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/extras" element={<Extras />} />
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/login" element={<RegisterLogin />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </HotelProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
