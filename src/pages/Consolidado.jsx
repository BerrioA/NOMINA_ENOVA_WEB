import { Layout } from "./Layout";
import TableUsers from "../components/TableUsers";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";

export const Consolidado = () => {
  return (
    <Layout>
      <WelcomeAndText title="Consolidado" Subtitle="Consolidado de nominas." />
      <TableUsers />
    </Layout>
  );
};
