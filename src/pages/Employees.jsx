import { Layout } from "./Layout";
import TableUser from "../components/TableUser";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";

export const Employees = () => {
  return (
    <Layout>
      <WelcomeAndText
        title="Empleados"
        Subtitle="Lista de Empleados."
      />
      <TableUser />
    </Layout>
  );
};
