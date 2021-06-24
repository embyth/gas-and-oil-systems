import Head from "next/head";

import { ScreenContextProvider } from "../store/screen-context";

import Layout from "../components/layout/layout";
import Details from "../components/details/details";

import { getDetailsProps } from "../utils/props/collector";

import { getContentData, getContentFiles } from "../utils/content";

function CalculationDetailsPage({ details, screensInfo, currentCalculation }) {
  return (
    <>
      <Head>
        <title>{details.title}</title>
        <meta name="description" content={details.excerpt} />
      </Head>
      <ScreenContextProvider initialState={screensInfo}>
        <Layout currentCalculation={currentCalculation}>
          <Details details={details} />
        </Layout>
      </ScreenContextProvider>
    </>
  );
}

export function getStaticProps(context) {
  const { detail } = context.params;

  const contentData = getContentData(detail);

  return {
    props: {
      ...getDetailsProps(),
      details: contentData,
    },
  };
}

export function getStaticPaths() {
  const contentFilenames = getContentFiles();

  const detailsSlugs = contentFilenames.map((fileName) =>
    fileName.replace(/\.md$/, "")
  );

  return {
    paths: detailsSlugs.map((slug) => ({ params: { detail: slug } })),
    fallback: false,
  };
}

export default CalculationDetailsPage;
