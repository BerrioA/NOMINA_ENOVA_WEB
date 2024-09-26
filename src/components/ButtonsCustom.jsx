import Search from "./UI/Search";
import ButtonAdd from "./UI/ButtonAdd";

export const ButtonsCustom = () => {
  return (
    <div className="flex w-full flex-col md:flex-row md:justify-between justify-center items-center mb-2 gap-2 mx-auto">
      <Search />
      <ButtonAdd />
    </div>
  );
};
