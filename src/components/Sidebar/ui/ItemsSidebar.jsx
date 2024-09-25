import {
  BarChart3,
  Boxes,
  Receipt,
  LayoutDashboard,
  Package,
  Settings,
  LifeBuoy,
  UserCircle,
} from "lucide-react";
import { SideBar, SidebarItem } from "../../../components/Sidebar/ui/ContentSideNav";

export const ItemsSidebar = () => {
  return (
    <SideBar>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert
        active
      />
      <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />
      <SidebarItem icon={<UserCircle size={20} />} text="Users" />
      <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
      <SidebarItem icon={<Package size={20} />} text="Orders" alert />
      <SidebarItem icon={<Receipt size={20} />} text="Billings" />
      <hr className="my-3" />
      <SidebarItem icon={<Settings size={20} />} text="Settings" />
      <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
    </SideBar>
  );
};
