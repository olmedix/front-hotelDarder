import { Header } from "../components/Header";
import { useHotel } from "../contexts/HotelContext";

export function Contacto() {
  const { hotel, loading, error } = useHotel();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative w-full h-screen bg-cover bg-center ">
      <main className="w-full h-screen mt-40">
        <div className="w-2/3 mx-auto my-6 text-black bg-[#f2f2f2] rounded-lg shadow-gray-700 shadow-lg">
          <h2 className="pt-12 pb-8 font-semibold text-gray-500">
            HABLA CON UN EXPERTO AHORA
          </h2>
          <h3 className="pb-8 text-3xl font-semibold">
            ¿Necesitas ayuda o un consejo?
          </h3>
          <p className="text-gray-500 text-lg font-medium">
            Llámanos al número
          </p>
          <p className="text-4xl text-[#0097e6] font-semibold pb-6">
            <a href={`tel:${hotel[0].phone}`} className="hover:underline">
              {hotel[0].phone}
            </a>
          </p>

          <p className="text-gray-400">
            Lunes a Viernes (09:00 a 22:00) (GMT+01:00)
          </p>
          <p className="text-gray-400">
            Sábados y Domingos (10:00 a 18:00) (GMT+01:00)
          </p>

          <p className="pt-3.5 text-gray-500 text-lg font-medium">
            O envíanos un correo a{" "}
          </p>

          <p className="pb-12">
            <a
              href={`mailto:${hotel[0].email}`}
              className="text-[#0097e6] underline "
            >
              {hotel[0].email}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
