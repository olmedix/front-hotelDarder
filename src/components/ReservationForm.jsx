import { format } from "date-fns";
import { FaHotel } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // estilos base
import "react-date-range/dist/theme/default.css"; // tema por defecto

export function ReservationForm({
  showCalendar,
  setShowCalendar,
  state,
  setState,
  showPeople,
  setShowPeople,
  people,
  setPeople,
  showRooms,
  setShowRooms,
  rooms,
  setRooms,
}) {
  const handleClickAway = () => {
    setShowCalendar(false);
  };

  const [room1, setRoom1] = useState(1);
  const [room2, setRoom2] = useState(1);
  const [room3, setRoom3] = useState(1);

  return (
    <section className="sticky top-0 w-3/5 h-22 mx-auto mt-96 bg-[#FFFFF0] border rounded-2xl z-50">
      <div className="flex h-full text-black">
        <div className="h-full border-r w-2/7">
          <h5 className="font-semibold mt-1 mb-3">DESTINO</h5>
          <p className="flex ml-3tems-center justify-center">
            <span className="mr-2 mt-1 text-[#0097e6]">
              <FaHotel />
            </span>
            Hotel Emili Darder
          </p>
        </div>

        <div
          className="h-full border-r w-1/4 cursor-pointer "
          onClick={() => setShowCalendar(!showCalendar)}
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

        <div className="h-full border-r w-44">
          <button
            className="w-full h-full text-left"
            onClick={() => setShowPeople(!showPeople)}
          >
            <h5 className="relative font-semibold text-center -top-4">
              PERSONAS
            </h5>
            <p className="flex text-center items-center justify-center">
              <FaUser className="text-1xl text-[#0097e6]" />
              <span className="relative pl-2 text-lg">{people}</span>
            </p>
          </button>

          {showPeople && (
            <div className="absolute z-60 w-44 h-20 bg-[#FFFFF0] border">
              {/* Habitación 1 */}
              <div className="flex flex-col justify-between items-center border-b last:border-b-0 p-2 bg-[#FFFFF0]">
                <h3 className="font-bold text-[#0097e6] text-lg mb-2">
                  Habitación 1
                </h3>

                <div className="flex justify-between items-center w-full px-4">
                  <div
                    className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center"
                    onClick={() => {
                      if (room1 > 1) {
                        setRoom1(room1 - 1);
                        setPeople(room1 - 1);
                      }
                    }}
                  >
                    <span className="text-[#0097e6] font-bold text-xl">-</span>
                  </div>

                  <p className="font-semibold text-xl">{room1}</p>
                  <div
                    className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center"
                    onClick={() => {
                      if (room1 < 4) {
                        setRoom1(room1 + 1);
                        setPeople(room1 + 1);
                      }
                    }}
                  >
                    <span className="text-[#0097e6] font-bold text-xl">+</span>
                  </div>
                </div>
              </div>

              {/* Habitación 2 */}
              {rooms >= 2 && (
                <div className="flex flex-col justify-between items-center border-b last:border-b-0 p-2 bg-[#FFFFF0]">
                  <h3 className="font-bold text-[#0097e6] text-lg mb-2">
                    Habitación 2
                  </h3>
                  <div className="flex justify-between items-center w-full px-4">
                    <div
                      className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center"
                      onClick={() => {
                        if (room2 > 1) {
                          setRoom2(room2 - 1);
                          setPeople(room1 + room2 - 1);
                        }
                      }}
                    >
                      <span className="text-[#0097e6] font-bold text-xl">
                        -
                      </span>
                    </div>
                    <p className="font-semibold text-xl">{room2}</p>
                    <div
                      className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center"
                      onClick={() => {
                        if (room2 < 4) {
                          setRoom2(room2 + 1);
                          setPeople(people + 1);
                        }
                      }}
                    >
                      <span className="text-[#0097e6] font-bold text-xl">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Habitación 3 */}
              {rooms === 3 && (
                <div className="flex flex-col justify-between items-center border-b last:border-b-0 p-2 bg-[#FFFFF0]">
                  <h3 className="font-bold text-[#0097e6] text-lg mb-2">
                    Habitación 3
                  </h3>
                  <div className="flex justify-between items-center w-full px-4">
                    <div
                      className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center"
                      onClick={() => {
                        if (room3 > 1) {
                          setRoom3(room3 - 1);
                          setPeople(people - 1);
                        }
                      }}
                    >
                      <span className="text-[#0097e6] font-bold text-xl">
                        -
                      </span>
                    </div>
                    <p className="font-semibold text-xl">{room3}</p>
                    <div
                      className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full flex items-center justify-center"
                      onClick={() => {
                        if (room3 < 4) {
                          setRoom3(room3 + 1);
                          setPeople(people + 1);
                        }
                      }}
                    >
                      <span className="text-[#0097e6] font-bold text-xl">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-full border-r w-44">
          <button
            onClick={() => setShowRooms(!showRooms)}
            className="w-full h-full text"
          >
            <h5 className="relative font-semibold -top-4">HABITACIONES</h5>
            <p className="flex text-center items-center justify-center">
              <FaBed className="text-2xl text-[#0097e6]" />
              <span className="relative -mt-0.5 pl-3 text-lg">{rooms}</span>
            </p>
          </button>

          {showRooms && (
            <div className="absolute z-50  w-44 h-20 bg-[#FFFFF0] border">
              <div className="flex justify-between items-center h-full px-10">
                <div
                  className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full"
                  onClick={() => {
                    if (rooms > 1) {
                      const newRooms = rooms - 1;
                      setRooms(newRooms);

                      // Actualiza los valores de las habitaciones según el nuevo número de habitaciones
                      let newRoom1 = room1;
                      let newRoom2 = newRooms >= 2 ? room2 : 0;
                      let newRoom3 = newRooms === 3 ? room3 : 0;

                      setRoom2(newRoom2);
                      setRoom3(newRoom3);

                      const totalPeople = newRoom1 + newRoom2 + newRoom3;
                      setPeople(totalPeople);
                    }
                  }}
                >
                  <button className="absolute top-5 left-11.5 font-bold text-[#0097e6] text-2xl">
                    -
                  </button>
                </div>

                <p className="font-semibold text-xl">{rooms}</p>

                <div
                  className="w-6 h-6 bg-gray-300 border-2 border-[#0097e6] rounded-full"
                  onClick={() => {
                    if (rooms < 3) {
                      setRooms(rooms + 1);
                      if (rooms === 1) {
                        setRoom2(1);
                      } else if (rooms === 2) {
                        setRoom3(1);
                      }
                      setPeople(
                        room1 +
                          (rooms === 1 ? 1 : room2) +
                          (rooms === 2 ? 1 : room3)
                      );
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

        <div className="w-1/6">
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
