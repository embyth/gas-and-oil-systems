import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";

import Layout from "../components/layout/layout";
import OilTransmission from "../components/oil-transmission/oil-transmission";

import { getOilTransmissionProps } from "../utils/calculations";

const OilTransmissionPage = ({
  currentCalculation,
  incomeInputFields,
  resultFields,
  introInfo,
  screensInfo,
}) => (
  <>
    <Head>
      <title>Технологічний розрахунок магістрального нафтопроводу</title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <Layout currentCalculation={currentCalculation}>
        <OilTransmission
          screensInfo={screensInfo}
          introInfo={introInfo}
          incomeInputFields={incomeInputFields}
          resultFields={resultFields}
        />
      </Layout>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getOilTransmissionProps(),
});

export default OilTransmissionPage;
