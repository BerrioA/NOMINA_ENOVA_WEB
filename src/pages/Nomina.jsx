import { Layout } from "./Layout";
import  TableUsers  from "../components/TableUsers";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";

export const Nomina = () => {
  return (
    <Layout>
      <WelcomeAndText title="Nóminas" Subtitle="Listado de nóminas."/>
      <TableUsers />
    </Layout>
  );
};
