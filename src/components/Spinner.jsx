// src/components/Spinner.jsx
import { PropagateLoader } from "react-spinners";

export function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#0097e6" />
    </div>
  );
}
