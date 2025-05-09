import { format } from "date-fns";
import { FaHotel } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


import ClickAwayListener from "@mui/material/ClickAwayListener";
import React, { useState,useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // estilos base
import "react-date-range/dist/theme/default.css"; // tema por defecto

export function ReservationForm() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [people, setPeople] = useState(1);
  const [roomNumber, setRoomNumber] = useState(1);
  const [rooms, setRooms] = useState([
    { id: "room1", value: 1 },
    { id: "room2", value: 1 },
    { id: "room3", value: 1 },
  ]);
  const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  const handleClickAway = () => {
    setShowCalendar(false);
  };

  useEffect(() => {
    const totalPeople = rooms
      .slice(0, roomNumber)
      .reduce((sum, room) => sum + room.value, 0);
    setPeople(totalPeople);
  }, [rooms, roomNumber]);

  const updateRoomValue = (id, delta) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === id) {
          const newValue = room.value + delta;
          if (newValue >= 1 && newValue <= 4) {
            return { ...room, value: newValue };
          }
        }
        return room;
      })
    );
  };

  return (
    <section className="sticky top-0 w-8/10 h-22 mx-auto bg-[#FFFFF0] border rounded-2xl z-50">
      <div className="flex h-full text-black">

        {/* DESTINO */}
        <div className="h-full  w-2/10">
          <h5 className="font-semibold mt-1 mb-3">DESTINO</h5>
          <p className="flex ml-3tems-center justify-center">
            <span className="mr-2 mt-1 text-[#0097e6]">
              <FaHotel />
            </span>
            Hotel Emili Darder
          </p>
        </div>

        {/* FECHAS */}
        <div
          className="h-full  w-2/10 cursor-pointer "
          onClick={() => {
            setShowCalendar(!showCalendar),
              setShowPeople(false),
              setShowRooms(false);
          }}
        >
          <h5 className="font-semibold mb-4">FECHAS</h5>
          <p className="flex w-full items-center justify-center">
            <IoCalendarNumberSharp className="text-[#0097e6]" />
            {`${format(state[0].startDate, "yyyy/MM/dd")} - ${format(
              state[0].endDate,
              "yyyy/MM/dd"
            )}`}
          </p>
          {showCalendar && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="absolute z-70 mt-6">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  months={2}
                  minDate={new Date()}
                  direction="horizontal"
                />
              </div>
            </ClickAwayListener>
          )}
        </div>

        {/* PERSONAS */}
        <div className="h-full w-2/10 cursor-pointer">
          <button
            className="w-full h-full text-left"
            onClick={() => {
              setShowPeople(!showPeople);               
            }}
          >
            <h5 className="relative font-semibold text-center -top-4 truncate">
              PERSONAS
            </h5>
            <p className="flex text-center items-center justify-center">
              <FaUser className="text-1xl text-[#0097e6]" />
              <span className="relative pl-2 text-lg">{people}</span>
            </p>
          </button>

          {showPeople && (
           
           <div className="absolute z-60 w-2/10 h-20 bg-[#FFFFF0] ">
            <AnimatePresence>
              {rooms.slice(0, roomNumber).map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between items-center last:border-b-0 p-2 bg-[#FFFFF0] border-x-3 border-b-3"
                >
                  <h3 className="font-bold text-[#0097e6] text-lg mb-2">
                    Habitación {index + 1}
                  </h3>

                  <div className="flex justify-between items-center w-full px-4">
        <div
          className={`w-6 h-6 bg-gray-300 border-[#0097e6] rounded-full flex items-center justify-center cursor-pointer ${
            room.value === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => room.value > 1 && updateRoomValue(room.id, -1)}
        >
          <span className="text-[#0097e6] font-bold text-xl">-</span>
        </div>

        <p className="font-semibold text-xl">{room.value}</p>

        <div
          className={`w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center cursor-pointer ${
            room.value === 4 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => room.value < 4 && updateRoomValue(room.id, 1)}
        >
          <span className="text-[#0097e6] font-bold text-xl">+</span>
        </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
         </div>
            
          )}
        </div>

        {/* HABITACIONES */}
        <div className="h-full w-2/10 cursor-pointer truncate">
          <button
            onClick={() => {
              setShowRooms(!showRooms);
            }}
            className="w-full h-full text"
          >
            <h5 className="relative font-semibold -top-4">HABITACIONES</h5>
            <p className="flex text-center items-center justify-center">
              <FaBed className="text-2xl text-[#0097e6]" />
              <span className="relative -mt-0.5 pl-3 text-lg">{roomNumber}</span>
            </p>
          </button>

          {showRooms && (
          
              <div className="absolute w-2/10 left-6/10 z-50 h-20 bg-[#FFFFF0]">
                <div className="flex justify-between items-center h-full px-10">
                  <div
                    className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full"
                    onClick={() => {
                      if (roomNumber > 1) {
                        setRoomNumber(roomNumber - 1);
                      }
                    }}
                  >
                    <button className="absolute top-5 left-11.5 font-bold text-[#0097e6] text-2xl">
                      -
                    </button>
                  </div>

                  <p className="font-semibold text-xl">{roomNumber}</p>

                  <div
                    className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full"
                    onClick={() => {
                      if (roomNumber < 3) {
                        setRoomNumber(roomNumber + 1);
                        
                      }
                    }}
                  >
                    <button className="absolute top-5.5 right-11 font-bold text-[#0097e6] text-xl">
                      +
                    </button>
                  </div>
                </div>
              </div>
          
          )}
        </div>

        <div className="w-2/10">
          <button
            className="w-full h-full bg-[#0097e6] text-white font-bold text-2xl rounded-br-2xl rounded-tr-2xl"
            onClick={() => {
              console.log("Personas: " + people);
            }}
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
}
