import { GrRestaurant } from "react-icons/gr";
import { GiMusicalScore } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { TbMassage } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { FaParking } from "react-icons/fa";

export function Facilities() {
  return (
    <section className="w-2/3 px-5 mx-auto text-black bg-[#fff]">
      <h3 className="pl-5 text-2xl text-left text-[#1e272e]">
        Servicios e instalaciones
      </h3>

      <p className="text-gray-400 font-medium text-left text-lg mt-7">
        Descubre la amplia gama de servicios e instalaciones que garantizan una
        estancia de lo más agradable y cómoda en nuestro Hotel.
      </p>

      <div className=" w-full">
        <ul className="grid grid-cols-4 ">
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <GrRestaurant className="text-[#0097e6]" /> Restaurante de Autor
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <GiMusicalScore className="text-[#0097e6]" /> Música en vivo
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <MdOutlinePool className="text-[#0097e6]" /> Piscina climatizada
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <FaUmbrellaBeach className="text-[#0097e6]" /> Acceso directo a la
            playa
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <IoBed className="text-[#0097e6]" /> Cama balinesa
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <TbMassage className="text-[#0097e6]" /> Spa
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <CgGym className="text-[#0097e6]" /> Gimnasio
          </li>
          <li className="flex gap-x-1.5 font-semibold text-left text-lg mt-7">
            <FaParking className="text-[#0097e6]" /> Parking privado gratuito
          </li>
        </ul>
      </div>
    </section>
  );
}
