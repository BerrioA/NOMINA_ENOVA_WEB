import { Navbar, NavbarContent, Input, NavbarBrand } from "@nextui-org/react";
import { SearchIcon } from "./ui/SearchIcon.jsx";

export default function NavbarOne() {
  return (
    <Navbar isBordered className="shadow-md mb-4">
      <NavbarContent className="flex justify-between items-center w-full">
        <NavbarBrand className="mr-4">
          <p className="text-lg font-bold text-inherit">SIGEN</p>
        </NavbarBrand>

        {/* Buscador visible en pantallas medianas y grandes */}
        <div className="hidden sm:flex flex-grow justify-center">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>

        {/* Buscador visible solo en pantallas pequeñas */}
        <div className="flex items-center sm:hidden">
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
      </NavbarContent>
    </Navbar>
  );
}
