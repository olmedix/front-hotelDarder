import { Header } from "../components/Header";

import React, { useState } from "react";
import { ReservationForm } from "../components/ReservationForm";
import { Accommodation } from "../components/Accommodation";
import { Facilities } from "../components/Facilities";

export function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [people, setPeople] = useState(1);
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState(1);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <main className="relative w-full h-screen bg-white ">
      <section className="imgHotel w-full h-full bg-cover bg-center bg-no-repeat bg-fixed bg-white">
        <Header />
        <ReservationForm
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          state={state}
          setState={setState}
          showPeople={showPeople}
          setShowPeople={setShowPeople}
          people={people}
          setPeople={setPeople}
          showRooms={showRooms}
          setShowRooms={setShowRooms}
          rooms={rooms}
          setRooms={setRooms}
        />
      </section>

      <section className="w-2/3 mx-auto bg-[#fff]">
        <h2 className="text-[#1e272e] font-semibold text-3xl pt-26 mb-5">
          Hotel Emili Darder: Descubre el mejor Hotel para tus vacaciones
        </h2>
        <p className="text-gray-500 text-justify text-lg mb-5">
          En el Hotel Emili Darder, cada rincón está diseñado para ofrecerte una
          experiencia única e inolvidable. Situado en un entorno privilegiado,
          nuestro hotel combina el encanto local con un servicio atento y
          cercano que te hará sentir como en casa. Valoramos la conexión con el
          entorno y trabajamos con pasión para preservar la belleza natural que
          nos rodea, creando un refugio donde puedas disfrutar del presente
          mientras contribuimos a un futuro más sostenible. Ven a descubrir
          momentos especiales y transforma tu estadía en recuerdos que durarán
          para siempre.
        </p>
      </section>

      <Accommodation />
      <Facilities />
    </main>
  );
}
