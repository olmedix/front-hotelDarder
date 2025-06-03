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

export const fetchExtras = async () => {
  const response = await fetch(`${API_BASE_URL}/extra`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener los extras");
  const result = await response.json();
  return result;
};

export const fetchReservaExtras = async (reservations) => {
  const response = await fetch(`${API_BASE_URL}/extraReservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reservations }),
  });
  if (!response.ok) throw new Error("Error al obtener los extras reservados");
  const result = await response.json();
  return result;
};
export const fetchUpdateReservaExtras = async (
  extra_reservation_number,
  status
) => {
  const response = await fetch(
    `${API_BASE_URL}/extraReservation/${extra_reservation_number}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) throw new Error("Error al actualizar la reserva");
  const result = await response.json();
  return result;
};

export const fetchReserva = async (sendEmail, reservations) => {
  const response = await fetch(`${API_BASE_URL}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ sendEmail, reservations }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error al realizar la reserva:", errorData);
    throw new Error("Error al realizar la reserva");
  }
  const result = await response.json();
  return result;
};

export const fetchUpdateReserva = async (reservation_number, status) => {
  const response = await fetch(
    `${API_BASE_URL}/reservation/${reservation_number}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) throw new Error("Error al actualizar la reserva");
  const result = await response.json();
  return result;
};

export const fetchCategoriesAvailable = async (dates) => {
  const params = new URLSearchParams({
    start_date: dates.start_date,
    end_date: dates.end_date,
  });

  const response = await fetch(
    `${API_BASE_URL}/categories-available?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok)
    throw new Error("Error al obtener las categorías disponibles");

  return await response.json();
};

export const fetchPayment = async (payment) => {
  const response = await fetch(`${API_BASE_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });
  if (!response.ok) throw new Error("Error al realizar el pago");
  const result = await response.json();
  return result;
};

export const login = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error de inicio de sesión");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al cerrar sesión");
  }

  return response.json();
};

export const register = async (registerData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  }

  return response.json();
};

export const fetchForgotPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al enviar el correo de recuperación"
    );
  }

  return response.json();
};

export const fetchGetUser = async () => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el usuario");
  }

  return response.json();
};

export const fetchUpdateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el usuario");
  }

  return response.json();
};

export const fetchDeleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el usuario");
  }

  return response.json();
};

export const fetchRestoreUser = async (email) => {
  const response = await fetch(API_BASE_URL + "/request-restore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al restaurar el usuario");
  }

  return response.json();
};

export const fetchMyReservations = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/reservation/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al obtener las reservas del usuario"
    );
  }
  return response.json();
};

export const fetchPension = async () => {
  const response = await fetch(`${API_BASE_URL}/pension`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener las pensiones");
  const result = await response.json();
  return result;
};
