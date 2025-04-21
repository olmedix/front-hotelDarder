import React from "react";
import "../css/react-carousel.css";
import { Carousel } from "react-responsive-carousel";
import { useCategories } from "../contexts/CategoryContext";
import { URL_BACK } from "../services/api";

export function CardCategory() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <article className="flex gap-4">
      {categories.map((category) => (
        <div className="flex w-md gap-4 my-6 text-black bg-[#f2f2f2] rounded-bl-lg rounded-br-lg shadow-gray-700 shadow-lg">
          <div className="rounded-lg w-md">
            {console.log(categories)}
            <Carousel>
              {category.images.map((image) => (
                <img
                  key={image.id}
                  src={URL_BACK + image.url}
                  alt={category.name}
                  className="w-full rounded-tl-lg rounded-tr-lg"
                />
              ))}
            </Carousel>

            <div className="text-left mt-2 ml-2 rounded-bl-lg rounded-br-lg">
              <h4 className="text-xl font-bold  text-[#1e272e]">
                Habitación {category.name}
              </h4>
              <p className="mt-1 text-lg font-semibold text-[#555]">
                {category.room_view.name}{" "}
                <span className="ml-5">{category.roomArea} M²</span>
              </p>
              <p className="text-sm text-[#555] py-3.5 pr-2">
                {category.description}
              </p>
            </div>

            <button className="mb-5 py-2 px-4  bg-[#0097e6] text-white font-semibold rounded-lg hover:bg-[#0077b6] transition duration-300 ease-in-out transform hover:scale-105">
              Reserva ahora
            </button>
          </div>
        </div>
      ))}
    </article>
  );
}
