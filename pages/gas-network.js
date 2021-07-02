import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";
import { CalculationDataContextProvider } from "../store/calculation-data-context";
import { CalculationTypeContextProvider } from "../store/calculation-type-context";

import Layout from "../components/layout/layout";
import GasNetwork from "../components/gas-network/gas-network";

import { getGasNetworkProps } from "../utils/props/collector";

const GasNetworkPage = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  physicsResults,
  consumptionsInputFields,
  circlesInputFields,
  circlesResults,
}) => (
  <>
    <Head>
      <title>Розрахунок системи газопостачання населеного пункту</title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <CalculationTypeContextProvider calculation={currentCalculation}>
        <CalculationDataContextProvider>
          <Layout currentCalculation={currentCalculation}>
            <GasNetwork
              screensInfo={screensInfo}
              introInfo={introInfo}
              incomeInputFields={incomeInputFields}
              physicsResults={physicsResults}
              consumptionsInputFields={consumptionsInputFields}
              circlesInputFields={circlesInputFields}
              circlesResults={circlesResults}
            />
          </Layout>
        </CalculationDataContextProvider>
      </CalculationTypeContextProvider>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getGasNetworkProps(),
});

export default GasNetworkPage;
