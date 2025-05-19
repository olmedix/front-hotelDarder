import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CategoryProvider } from "./contexts/CategoryContext";
import { HotelProvider } from "./contexts/HotelContext";
import { UserProvider } from "./contexts/UserContext";
import { ReservationProvider } from "./contexts/ReservationContext";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import { UserProfile } from "./pages/UserProfile";
import { Contacto } from "./pages/Contacto";
import { Extras } from "./pages/Extras";
import { Home } from "./pages/Home";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { ReservationPaymentSuccess } from "./pages/ReservationPaymentSuccess";
import { RegisterLogin } from "./pages/RegisterLogin";
import { Booking } from "./pages/Booking";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <ReservationProvider>
        <UserProvider>
          <CategoryProvider>
            <HotelProvider>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/booking" element={<Booking />} />

                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/extras" element={<Extras />} />
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
                  <Route
                    path="/hotel-payment-success"
                    element={<ReservationPaymentSuccess />}
                  />

                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
              </Router>
            </HotelProvider>
          </CategoryProvider>
        </UserProvider>
      </ReservationProvider>
    </>
  );
}

export default App;
