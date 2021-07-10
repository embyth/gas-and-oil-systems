import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";
import { CalculationDataContextProvider } from "../store/calculation-data-context";
import { CalculationTypeContextProvider } from "../store/calculation-type-context";

import Layout from "../components/layout/layout";
import OilTransmission from "../components/oil-transmission/oil-transmission";

import { getOilTransmissionProps } from "../utils/props/collector";

const OilTransmissionPage = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  stationFields,
  resultFields,
}) => (
  <>
    <Head>
      <title>Технологічний розрахунок магістрального нафтопроводу</title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <CalculationTypeContextProvider calculation={currentCalculation}>
        <CalculationDataContextProvider>
          <Layout currentCalculation={currentCalculation}>
            <OilTransmission
              screensInfo={screensInfo}
              introInfo={introInfo}
              incomeInputFields={incomeInputFields}
              stationFields={stationFields}
              resultFields={resultFields}
            />
          </Layout>
        </CalculationDataContextProvider>
      </CalculationTypeContextProvider>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getOilTransmissionProps(),
});

export default OilTransmissionPage;
