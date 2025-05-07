import { useEffect, useState } from "react";

import { Header } from "../components/Header";
import { CardMyReservations } from "../components/CardMyReservations";
import { fetchMyReservations } from "../services/api";
import { useUser } from "../contexts/UserContext";

export function Reservas() {
  const { user, loading: loadingUser, error: errorUser } = useUser();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return; // Espera a que user esté disponible

    const fetchReservations = async () => {
      try {
        const response = await fetchMyReservations(user.id);
        console.log("response" + response);
        setReservations(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [user]);

  if (loading || loadingUser) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (errorUser) return <div>No se encontró usuario.</div>;

  return (
    <div className="relative w-full h-screen bg-cover bg-center ">
      <section className="w-2/3 mx-auto pb-6 my-6 text-black ">
        <main className="w-full  mt-14 ">
          <h1 className="pt-8">Mis Reservas</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
            {reservations.data.map((reservation) => (
              <CardMyReservations
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}
