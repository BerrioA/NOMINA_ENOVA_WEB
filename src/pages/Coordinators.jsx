import { Layout } from "./Layout";
import TableUser from "../components/TableUser";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { ButtonsCustom } from "../components/ButtonsCustom";

export const Coordinators = () => {
  return (
    <Layout>
      <WelcomeAndText
        title="Coordinadores"
        Subtitle="Lista de Coordinadores."
      />
      <ButtonsCustom />
      <TableUser />
    </Layout>
  );
};
