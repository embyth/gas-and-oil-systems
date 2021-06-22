import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";
import { CalculationDataContextProvider } from "../store/calculation-data-context";

import Layout from "../components/layout/layout";
import GasIndoor from "../components/gas-indoor/gas-indoor";

import { getGasIndoorProps } from "../utils/props/collector";

const GasIndoorPage = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  segmentFields,
  resultFields,
}) => (
  <>
    <Head>
      <title>
        Аналітичний розрахунок газової мережі житлового будинку без застосування
        номограм
      </title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <CalculationDataContextProvider>
        <Layout currentCalculation={currentCalculation}>
          <GasIndoor
            currentCalculation={currentCalculation}
            screensInfo={screensInfo}
            introInfo={introInfo}
            incomeInputFields={incomeInputFields}
            segmentFields={segmentFields}
            resultFields={resultFields}
          />
        </Layout>
      </CalculationDataContextProvider>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getGasIndoorProps(),
});

export default GasIndoorPage;
