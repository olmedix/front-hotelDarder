import { NavLink, useLocation } from "react-router-dom";
import "../css/navigation.css";
import { TbMassage } from "react-icons/tb";
import { CiMedicalCross } from "react-icons/ci";
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
      path: "/contacto",
      icon: <ion-icon name="call-outline"></ion-icon>,
      label: "Contacto",
    },
    {
      path: "/extras",
      icon: <TbMassage className="text-5xl pt-5 mb-7" />,
      label: "Extras",
    },
    {
      path: "/reservas",
      icon: <ion-icon name="bed-outline"></ion-icon>,
      label: "Mis Reservas",
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
    <header className=" w-full relative flex">
      <div className="flex w-1/3 pl-20 pt-4 text-center items-center">
        <div className="flex items-center justify-center p-2.5 rounded-full shadow-2xl text-gray-800">
          <CiMedicalCross className="text-5xl text-white font-bold" />
          <h1 className="mb-2 ml-1 text-[#0097e6]">Emili Darder</h1>
        </div>
      </div>

      <div className="w-2/3 mt-10 mr-10 flex justify-end">
        <nav className="navigation">
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

            <div className="indicator"></div>
          </ul>
        </nav>
      </div>
      {user && (
        <div
          className="absolute top-14 right-0 mr-7 p-3 rounded-full cursor-pointer
        shadow-2xl text-gray-800 hover:scale-120 hover:text-white transition duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <IoLogInSharp className="text-2xl text-[#0097e6]" />
        </div>
      )}
    </header>
  );
}
