export const URL_BACK = "http://hotelemilidarder.test/";
export const API_BASE_URL = "http://hotelemilidarder.test/api";

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

export const fetchHotel = async () => {
  const response = await fetch(`${API_BASE_URL}/hotel`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok)
    throw new Error("Error al obtener la informacion del hotel");
  const result = await response.json();
  return result;
};
