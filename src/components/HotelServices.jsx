import "../css/react-carousel.css";
import { Carousel } from "react-responsive-carousel";
import { DESCRIPTION_HOTEL } from "../services/descriptionsHotel";
import { URL_BACK } from "../services/api";
import { useHotel } from "../contexts/HotelContext";

export function HotelServices() {
  const { hotel, loading, error } = useHotel();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="w-2/3 mx-auto px-5 py-26 bg-[#fff]">
      <h3 className="pl-5 pb-5 text-2xl text-left text-[#1e272e]">
        Conoce nuestro Hotel
      </h3>
      <div className="overflow-x-auto text-gray-400 text-left text-lg mt-7">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          showThumbs={false}
        >
          {DESCRIPTION_HOTEL.map((hotels) => (
            <div className="flex text-black text-left" key={hotels.id}>
              <div className="w-1/2 text-xl pb-3 px-5">
                <h4 className="pl-5 py-5 text-2xl font-bold">{hotels.title}</h4>
                <h5 className="text-center text-gray-500 font-medium pb-2">
                  {hotels.subtitle}
                </h5>
                <p className="text-gray-500 text-justify text-lg">
                  {hotels.description}
                </p>
              </div>
              <div className="w-1/2">
                <img
                  className="w-full pr-7"
                  src={URL_BACK + hotel[0].images[hotels.id].url}
                  alt={hotels.title}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
