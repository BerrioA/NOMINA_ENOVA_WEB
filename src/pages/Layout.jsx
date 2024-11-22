import { Sidebar } from "../components/Sidebar/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonBack from "../components/UI/ButtonBack";
import { ArrowBigLeft } from "lucide-react";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
    const manejarRegreso = () => {
      navigate(-1);
    };
    const location = useLocation();
    const esDashboard = location.pathname === "/dashboard";

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto p-4">
          {children}
          {!esDashboard && (
            <ButtonBack
              textButton="Regresar"
              onClick={manejarRegreso}
              icon={<ArrowBigLeft />}
            />
          )}
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
