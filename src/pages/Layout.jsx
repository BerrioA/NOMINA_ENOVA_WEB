import { useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import NavbarOne from "../components/Navbar/NavbarOne";
export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto p-4">
          <NavbarOne/>
          {children}
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
