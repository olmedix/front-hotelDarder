import { useState, useEffect } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { SiTicktick } from "react-icons/si";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export function BookingPension({
  pension = [],
  selectedRegimen,
  setSelectedRegimen,
}) {
  const [openId, setOpenId] = useState(null); // cuál está abierto

  // Seleccionar el primero automáticamente si no hay ninguno
  useEffect(() => {
    if (pension.length > 0 && !selectedRegimen) {
      setSelectedRegimen(pension[0].id);
      setOpenId(pension[0].id);
    }
  }, [pension, selectedRegimen, setSelectedRegimen]);

  const handleRadioChange = (id) => {
    setSelectedRegimen(id);
    setOpenId(id);
  };

  return (
    <section className="block w-9/10 text-left px-5 mx-auto rounded-t-xl">
      <h2 className="text-black text-4xl font-bold">Elige un régimen</h2>

      {pension.map((item) => {
        const isOpen = openId === item.id;
        const isChecked = selectedRegimen === item.id;

        return (
          <Collapsible.Root
            key={item.id}
            open={isOpen}
            onOpenChange={(open) => setOpenId(open ? item.id : null)}
            className="border-2 border-gray-200 rounded-lg bg-gray-100 p-5 mt-5"
          >
            <div className="flex justify-between items-center pb-3 border-b-2 border-gray-300 text-lg">
              {/* Radio + Label (no abre/cierra) */}
              <label className="font-semibold flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="regimen"
                  value={item.name}
                  checked={isChecked}
                  onChange={() => handleRadioChange(item.id)}
                  className="mr-2 cursor-pointer"
                />
                {item.name}
              </label>

              {/* Precio + botón abrir/cerrar */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Persona/noche{" "}
                  <span className="text-xl font-semibold text-black">
                    {item.price}€
                  </span>
                </span>

                <Collapsible.Trigger asChild>
                  <button
                    type="button"
                    className="focus:outline-none"
                    aria-label={isOpen ? "Cerrar detalles" : "Abrir detalles"}
                  >
                    {isOpen ? (
                      <IoIosArrowUp className="text-xl font-bold" />
                    ) : (
                      <IoIosArrowDown className="text-xl font-bold" />
                    )}
                  </button>
                </Collapsible.Trigger>
              </div>
            </div>

            {/* Contenido colapsable */}
            <Collapsible.Content className="block w-full px-4 py-3">
              {(item.description || "")
                .split(",")
                .filter((s) => s.trim().length > 0)
                .map((desc, index) => (
                  <p key={index} className="flex mt-2">
                    <span className="pr-2 text-[#0097e6]">
                      <SiTicktick />
                    </span>
                    {desc.trim()}
                  </p>
                ))}
            </Collapsible.Content>
          </Collapsible.Root>
        );
      })}
    </section>
  );
}
