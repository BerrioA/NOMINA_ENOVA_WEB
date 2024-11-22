import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LogoEnova from "../../../assets/images/LogoSigenGreen.png";
import LogoDeveloper from "../../../assets/images/LogoSigenGreen.png";
import { useContext, createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut as LogoutAction, reset } from "../../../services/AuthSlice";

const SidebarContext = createContext();

export const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const Logout = () => {
    dispatch(LogoutAction());
    dispatch(reset());
    navigate("/");
  };

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
              expanded ? "w-8" : "w-0"
            }`}
            alt="LogoSideBar"
          />
          <h1
            className={`text-gray-600 font-bold transition-all duration-400 ${
              expanded ? "w-auto" : "hidden"
            }`}
          >
            SIGEN
          </h1>
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
              <h4 className="font-semibold">{`${user && user.nombre} ${
                user && user.apellido
              }`}</h4>
              <span className="text-xs text-gray-600">
                {user && user.correo}
              </span>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <MoreVertical size={20} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="copy" to="/ajustes">
                  Ajustes
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={Logout}
                >
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      onClick();
    }
  };

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-[#038604]"
            : "hover:bg-[#daffcc] hover:z-10 text-gray-600"
        }
      `}
      onClick={handleClick}
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
          className={`absolute right-2 w-2 h-2 rounded bg-[#038604] ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-[#038604] text-sm
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
  to: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarItem.defaultProps = {
  active: false,
  alert: false,
};

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};
