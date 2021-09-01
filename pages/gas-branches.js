import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";
import { CalculationDataContextProvider } from "../store/calculation-data-context";
import { CalculationTypeContextProvider } from "../store/calculation-type-context";

import Layout from "../components/layout/layout";
import GasBranches from "../components/gas-branches/gas-branches";

import { getGasBranchesProps } from "../utils/props/collector";

const GasBranchesPage = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  incomeSegmentsInputFields,
  branchesResults,
}) => (
  <>
    <Head>
      <title>
        Розрахунок розгалуженої системи газопостачання населеного пункту
      </title>
    </Head>
    <ScreenContextProvider initialState={screensInfo}>
      <CalculationTypeContextProvider calculation={currentCalculation}>
        <CalculationDataContextProvider>
          <Layout currentCalculation={currentCalculation}>
            <GasBranches
              screensInfo={screensInfo}
              introInfo={introInfo}
              incomeInputFields={incomeInputFields}
              incomeSegmentsInputFields={incomeSegmentsInputFields}
              branchesResults={branchesResults}
            />
          </Layout>
        </CalculationDataContextProvider>
      </CalculationTypeContextProvider>
    </ScreenContextProvider>
  </>
);

export const getStaticProps = () => ({
  props: getGasBranchesProps(),
});

export default GasBranchesPage;
