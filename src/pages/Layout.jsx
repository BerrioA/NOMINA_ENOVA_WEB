import { useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import PropTypes from "prop-types";
export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
