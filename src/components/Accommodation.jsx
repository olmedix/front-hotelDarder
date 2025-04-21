import { CardCategory } from "./CardCategory";

export function Accommodation() {
  return (
    <section className="w-2/3 mx-auto py-26  px-5 bg-[#fff]">
      <h3 className="pl-5 text-2xl text-left text-[#1e272e]">Alojamiento</h3>
      <div className="overflow-x-auto">
        <CardCategory />
      </div>
    </section>
  );
}
