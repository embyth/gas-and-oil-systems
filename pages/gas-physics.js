import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";
import { CalculationDataContextProvider } from "../store/calculation-data-context";
import { CalculationTypeContextProvider } from "../store/calculation-type-context";

import Layout from "../components/layout/layout";
import GasPhysics from "../components/gas-physics/gas-physics";

import { getGasPhysicsProps } from "../utils/props/collector";

const GasPhysicsPage = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  resultFields,
}) => (
  <>
    <Head>
      <title>Розрахунок фізичних властивостей газу</title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <CalculationTypeContextProvider calculation={currentCalculation}>
        <CalculationDataContextProvider>
          <Layout currentCalculation={currentCalculation}>
            <GasPhysics
              screensInfo={screensInfo}
              introInfo={introInfo}
              incomeInputFields={incomeInputFields}
              resultFields={resultFields}
            />
          </Layout>
        </CalculationDataContextProvider>
      </CalculationTypeContextProvider>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getGasPhysicsProps(),
});

export default GasPhysicsPage;
