import { Layout } from "./Layout";
import TableUser from "../components/TableUser";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";

export const Coordinators = () => {
  return (
    <Layout>
      <WelcomeAndText
        title="Coordinadores"
        Subtitle="Lista de Coordinadores."
      />
      <TableUser />
    </Layout>
  );
};
