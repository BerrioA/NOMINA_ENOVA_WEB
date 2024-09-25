import { Layout } from "./Layout";
import TableUser from "../components/TableUser";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";

export const Admins = () => {
  return (
    <Layout>
      <WelcomeAndText
        title="Administradores"
        Subtitle="Lista de Administradores"
      />
      <TableUser />
    </Layout>
  );
};
