import { ScreenContextProvider } from "../store/screen-context";

import Layout from "../components/layout/layout";
import Home from "../components/home/home";

import { getIndexProps } from "../utils/props/collector";

const HomePage = ({ currentCalculation, screensInfo }) => (
  <ScreenContextProvider initialState={screensInfo}>
    <Layout currentCalculation={currentCalculation}>
      <Home />
    </Layout>
  </ScreenContextProvider>
);

export const getStaticProps = () => ({
  props: getIndexProps(),
});

export default HomePage;
