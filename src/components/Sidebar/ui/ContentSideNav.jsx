import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import LogoEnova from "../../../assets/images/LogoSigenGreen.png";
import LogoDeveloper from "../../../assets/images/AB.jpg";
import { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SidebarContext = createContext();

export const SideBar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen transition-all duration-300 ${
        expanded ? "w-60 sm:w-40 md:w-52 lg:w-60" : "w-16"
      } bg-white`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm transition-all">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={LogoEnova}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="LogoSideBar"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={LogoDeveloper}
            alt="LogoUser"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-3">
              <h4 className="font-semibold">Alejandro Berrio</h4>
              <span className="text-xs text-gray-600">Developer</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export function SidebarItem({ icon, text, active, alert, to, onClick }) {
  const { expanded } = useContext(SidebarContext);

  const handleClick = () => {
    if (onClick) {
      onClick(); // Llama a la función onClick si se proporciona
    }
  };

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 hover:z-10 text-gray-600"
        }
      `}
      onClick={handleClick} // Maneja el clic aquí
    >
      {to ? (
        <NavLink to={to} className="flex items-center w-full">
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        </NavLink>
      ) : (
        <>
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        </>
      )}

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  alert: PropTypes.bool,
  to: PropTypes.string, // 'to' es opcional para manejar la navegación
  onClick: PropTypes.func, // Prop para manejar clics
};

SidebarItem.defaultProps = {
  active: false,
  alert: false,
};

// Corrección de la definición de propTypes
SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};
