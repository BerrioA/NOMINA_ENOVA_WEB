import {
  BarChart3,
  Receipt,
  LayoutDashboard,
  LifeBuoy,
  UserCircle,
  UserRoundCog,
  UsersRound,
  LogOut,
  MapPinHouse,
} from "lucide-react";
import {
  SideBar,
  SidebarItem,
} from "../../../components/Sidebar/ui/ContentSideNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut as LogoutAction, reset } from "../../../services/AuthSlice";

export const ItemsSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const Logout = () => {
    dispatch(LogoutAction()); // Usar el nuevo nombre aquí
    dispatch(reset());
    navigate("/");
  };

  return (
    <SideBar>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert
        to="/dashboard"
      />
      <SidebarItem icon={<Receipt size={20} />} text="Nóminas" to="/nominas" />
      {user && user.rol === "Administrador" && (
        <div>
          <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Consolidado"
            to="/consolidado"
          />
          <SidebarItem
            icon={<UserRoundCog size={20} />}
            text="Administradores"
            alert
            to="/administradores"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Coordinadores"
            to="/coordinadores"
          />
          <SidebarItem icon={<MapPinHouse size={20} />} text="Sedes" to="/sedes" />
        </div>
      )}
      <SidebarItem
        icon={<UsersRound size={20} />}
        text="Empleados"
        to="/empleados"
      />

      <hr className="my-3" />
      <SidebarItem icon={<LifeBuoy size={20} />} text="Ayuda" to="/ayuda" />
      <SidebarItem
        icon={<LogOut size={20} />}
        text="Cerrar Sesión"
        onClick={Logout}
      />
    </SideBar>
  );
};
