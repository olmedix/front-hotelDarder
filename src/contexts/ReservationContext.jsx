import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const ReservationContext = createContext();

// Hook personalizado
export const useReservation = () => useContext(ReservationContext);

// Proveedor del contexto
export const ReservationProvider = ({ children }) => {
  const [roomNumberSelected, setRoomNumberSelected] = useState(1);
  const [roomNumber, setRoomNumber] = useState(1);
  const [rooms, setRooms] = useState([
    { id: "room1", value: 1 },
    { id: "room2", value: 1 },
    { id: "room3", value: 1 },
  ]);
  const [people, setPeople] = useState(1);
  // Por defecto, la fecha de inicio es hoy y la fecha de fin es mañana
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: "selection",
    },
  ]);

  // Actualizar automáticamente la cantidad total de personas según las habitaciones
  useEffect(() => {
    const totalPeople = rooms
      .slice(0, roomNumber)
      .reduce((sum, room) => sum + room.value, 0);
    setPeople(totalPeople);
  }, [rooms, roomNumber]);

  return (
    <ReservationContext.Provider
      value={{
        people,
        setPeople,
        roomNumber,
        setRoomNumber,
        rooms,
        setRooms,
        state,
        setState,
        roomNumberSelected,
        setRoomNumberSelected,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
