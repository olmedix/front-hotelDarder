import { useReservation } from "../contexts/ReservationContext";
import { ReservationForm } from "../components/ReservationForm";

export function Booking() {
  const { state, roomNumber, rooms, people } = useReservation();

  return (
    <div>
      <div className="mt-40 ">
        <ReservationForm />
      </div>

      <div className="h-96 bg-amber-300 w-full"></div>
      <div className="h-96 bg-amber-300 w-full"></div>
      <div className="h-96 bg-amber-300 w-full"></div>
      <div className="h-96 bg-amber-300 w-full"></div>
      <div className="h-96 bg-amber-300 w-full"></div>
      <div className="h-96 bg-amber-300 w-full"></div>
    </div>
  );
}
