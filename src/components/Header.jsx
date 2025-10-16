import { NavLink, useLocation } from "react-router-dom";
import "../css/navigation.css";
import { TbMassage } from "react-icons/tb";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { IoLogInSharp } from "react-icons/io5";
import { logout } from "../services/api";

export function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const location = useLocation();
  const navItems = [
    {
      path: "/",
      icon: <ion-icon name="home-outline"></ion-icon>,
      label: "Inicio",
    },
    {
      path: "/booking",
      icon: <ion-icon name="bed-outline"></ion-icon>,
      label: "Reservar",
    },
    {
      path: "/extras",
      icon: <TbMassage className="text-5xl pt-5 mb-7" />,
      label: "Extras",
    },
    {
      path: "/contacto",
      icon: <ion-icon name="call-outline"></ion-icon>,
      label: "Contacto",
    },
    {
      path: "/login",
      icon: <ion-icon name="person-outline"></ion-icon>,
      label: "Inicia sesión",
    },
  ];

  const activeIndex = navItems.findIndex((item) => {
    const expectedPath =
      item.label === "Inicia sesión" && user ? "/profile" : item.path;
    return location.pathname === expectedPath;
  });

  //LOGOUT
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="absolute top-0 w-full flex flex-col md:flex-row z-50">
      <div className="mt-4 md:mt-12 mx-[10px] md:ml-10 flex flex-col md:flex-row md:items-center space-y-2 md:space-x-2 w-full">
        <h1 className="text-[#0097e6] font-serif font-semibold text-3xl tracking-wide drop-shadow-lg text-shadow-2xl shadow-gray-600">
          <span className="text-5xl md:hidden lg:inline">H.</span> Emili Darder
        </h1>
      </div>

      <div className="w-full lg:w-2/3 mt-4 lg:mt-10  lg:px-0 flex justify-center lg:justify-end">
        <nav className="navigation mt-16 md:mt-0">
          <ul>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`list ${index === activeIndex ? "activo" : ""}`}
              >
                <NavLink
                  to={
                    item.label === "Inicia sesión" && user
                      ? "/profile"
                      : item.path
                  }
                >
                  <span className="icon">{item.icon}</span>
                  {item.label === "Inicia sesión" && user ? (
                    <span className="texto">Mi perfil</span>
                  ) : (
                    <span className="texto">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}

            {activeIndex !== -1 && <div className="indicator"></div>}
          </ul>
        </nav>
      </div>
      {user && (
        <div
          className="absolute top-27 -right-7 p-1 bg-white md:bg-transparent md:top-14 md:right-0 mr-8 md:p-3 rounded-full cursor-pointer
        shadow-2xl text-gray-800 hover:scale-120 hover:text-white transition duration-300 ease-in-out z-100"
          onClick={handleLogout}
        >
          <IoLogInSharp className="text-2xl text-[#0097e6]" />
        </div>
      )}
    </header>
  );
}
