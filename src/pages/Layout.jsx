import { Sidebar } from "../components/Sidebar/Sidebar";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-wrap min-h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-4/5 bg-gray-100">
        <main>{children}</main>
      </div>
    </div>
  );
};

// Definición correcta de propTypes
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
