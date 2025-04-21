import "../css/react-carousel.css";
import { Carousel } from "react-responsive-carousel";

export function RestaurantBar() {
  return (
    <section className="w-2/3 mx-auto px-5 py-26 bg-[#fff]">
      <h3 className="pl-5 text-2xl text-left text-[#1e272e]">Gastronomia</h3>
      <div className="overflow-x-auto">
        <Carousel autoPlay={true} infiniteLoop={true} interval={5000}>
          <div className="flex h-96">
            <div className="w-1/2 bg-amber-400">
              <h6>S'illot</h6>
              <p>
                Un restaurante único, moderno y lujoso donde cada día podrás
                pobrar la gastronomía de un País diferente.
              </p>
            </div>
            <div className="w-1/2 bg-amber-800">
              <img
                className="w-full"
                src="imgs/hotel/restaurante.png"
                alt="restaurante"
              />
            </div>
          </div>

          <div className="flex h-96">
            <div className="w-1/2 bg-amber-400">
              <h6>S'illot</h6>
              <p>
                Un restaurante único, moderno y lujoso donde cada día podrás
                pobrar la gastronomía de un País diferente.
              </p>
            </div>
            <div className="w-1/2 bg-amber-800">
              <img
                className="w-full"
                src="imgs/hotel/piscina.png"
                alt="restaurante"
              />
            </div>
          </div>

          <div className="flex h-96">
            <div className="w-1/2 bg-amber-400">
              <h6>S'illot</h6>
              <p>
                Un restaurante único, moderno y lujoso donde cada día podrás
                pobrar la gastronomía de un País diferente.
              </p>
            </div>
            <div className="w-1/2 bg-amber-800">
              <img
                className="w-full"
                src="imgs/hotel/bar.png"
                alt="restaurante"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
