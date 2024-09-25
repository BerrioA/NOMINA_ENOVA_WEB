import {
  BarChart3,
  Receipt,
  LayoutDashboard,
  Settings,
  LifeBuoy,
  UserCircle,
  UserRoundCog,
  UsersRound,
  LogOut,
} from "lucide-react";
import {
  SideBar,
  SidebarItem,
} from "../../../components/Sidebar/ui/ContentSideNav";

export const ItemsSidebar = () => {
  return (
    <SideBar>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert
        to="/dashboard"
      />
      <SidebarItem icon={<Receipt size={20} />} text="Nóminas" to="/nominas" />
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
      <SidebarItem
        icon={<UsersRound size={20} />}
        text="Empleados"
        to="/empleados"
      />

      <hr className="my-3" />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        to="/settings"
      />
      <SidebarItem icon={<LifeBuoy size={20} />} text="Help" to="/help" />
      <SidebarItem
        icon={<LogOut size={20} />}
        text="Log Out"
        to="/"
      />
    </SideBar>
  );
};
