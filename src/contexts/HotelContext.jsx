import { createContext, useContext, useState, useEffect } from "react";
import { fetchHotel } from "../services/api";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getHotel = async () => {
      try {
        const data = await fetchHotel();
        setHotel(data);
      } catch (err) {
        setError("Error al obtener el hotel");
      } finally {
        setLoading(false);
      }
    };
    getHotel();
  }, []);

  return (
    <HotelContext.Provider value={{ hotel, loading, error }}>
      {children}
    </HotelContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useHotel = () => useContext(HotelContext);
