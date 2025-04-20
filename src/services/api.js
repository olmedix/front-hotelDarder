export const API_BASE = "http://hotelemilidarder.test/";
const API_BASE_URL = API_BASE + "api";

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener las categorías");
  const result = await response.json();
  return result;
};
