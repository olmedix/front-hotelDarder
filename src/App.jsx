import { CategoryProvider } from "./contexts/CategoryContext";
import { HotelProvider } from "./contexts/HotelContext";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import { UserProfile } from "./pages/UserProfile";
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
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <UserProvider>
        <CategoryProvider>
          <HotelProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/extras" element={<Extras />} />
                <Route
                  path="/reservas"
                  element={
                    <PrivateRoute>
                      <Reservas />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<RegisterLogin />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </HotelProvider>
        </CategoryProvider>
      </UserProvider>
    </>
  );
}

export default App;
