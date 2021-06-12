import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";
import { CalculationDataContextProvider } from "../store/calculation-data-context";

import Layout from "../components/layout/layout";
import GasTransmission from "../components/gas-transmission/gas-transmission";

import { getGasTransmissionProps } from "../utils/calculations";

const GasTransmissionPage = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  resultFields,
}) => (
  <>
    <Head>
      <title>Розрахунок режиму роботи газотранспортної системи</title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <CalculationDataContextProvider>
        <Layout currentCalculation={currentCalculation}>
          <GasTransmission
            currentCalculation={currentCalculation}
            screensInfo={screensInfo}
            introInfo={introInfo}
            incomeInputFields={incomeInputFields}
            resultFields={resultFields}
          />
        </Layout>
      </CalculationDataContextProvider>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getGasTransmissionProps(),
});

export default GasTransmissionPage;
