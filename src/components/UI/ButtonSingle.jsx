import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function ButtonSingle({
  textButton,
  onClick,
  children,
  icon,
  type
}) {
  return (
    <div className="mb-4 mt-4 flex flex-col justify-center">
      <Button
        color="primary"
        variant="shadow"
        type={type}
        onClick={onClick}
        className="button is-success is-fullwidth bg-[#038604] mt-2"
      >
        {icon && <span>{icon}</span>}
        {children || textButton}
      </Button>
    </div>
  );
}

// Definición correcta de propTypes
ButtonSingle.propTypes = {
  textButton: PropTypes.string.isRequired, // Asegúrate de que sea una cadena (texto del botón)
  onClick: PropTypes.func.isRequired, // `onClick` debe ser una función
  children: PropTypes.node, // Cualquier contenido dentro del botón (opcional)
  type: PropTypes.node,
  icon: PropTypes.node, // Un ícono o elemento (opcional)
  className: PropTypes.string, // Clase para estilos (opcional)
};
