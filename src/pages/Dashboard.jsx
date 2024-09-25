import { Layout } from "./Layout";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";

export const Dashboard = () => {
  return (
    <Layout>
      <WelcomeAndText
        title="Dashboard"
        Subtitle="Bienvenido(a) de vuelta...."
      />
    </Layout>
  );
};
