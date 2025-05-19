import { useHotel } from "../contexts/HotelContext";

export function Footer() {
  const { hotel } = useHotel();

  return (
    <footer className="bg-[#1e272e] text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* Logo y nombre */}
        <div className="flex items-center space-x-4">
          <img
            src="/imgs/logoHotelDarder.png"
            alt="Logo Hotel Emili Darder"
            className="h-16"
          />
          <h3 className="text-[#0097e6] text-xl font-semibold">
            Hotel {hotel[0]?.name}
          </h3>
        </div>

        {/* Datos de contacto */}
        <div className="text-center md:text-right">
          <p className="text-sm mb-1">
            {`${hotel[0]?.address}, ${hotel[0]?.city}, Mallorca, España`}
          </p>
          <p className="text-sm mb-2">
            Tel: {hotel[0]?.phone} · Email: {hotel[0]?.email}
          </p>
          <p className="text-xs text-gray-300">
            © 2025 Hotel Emili Darder. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
