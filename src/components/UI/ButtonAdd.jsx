import { Button } from "@nextui-org/react";
import { UserIcon } from "./UserIcon";

export default function App() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Button
        color="danger"
        variant="bordered"
        startContent={<UserIcon />}
        className="w-full md:w-auto" // Hace el botón de ancho completo en pantallas pequeñas y ancho automático en medianas y grandes
      >
        Agregar Usuario
      </Button>
    </div>
  );
}

