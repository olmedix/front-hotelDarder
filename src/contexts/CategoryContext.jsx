import { createContext, useContext, useState, useEffect } from "react";
import { fetchCategories } from "../services/api";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError("Error al obtener las categorías");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useCategories = () => useContext(CategoryContext);
