import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkSlug from "remark-slug";
import gfm from "remark-gfm";

import DetailsHeader from "./details-header";

// TD: Fix = React throws error on markdown-to-jsx render: Warning: validateDOMNesting(...): Whitespace text nodes cannot appear as a child of [<table>, <thead>, <tbody>, <tr>]
const Details = ({ details }) => (
  <>
    <DetailsHeader
      calculationHref={details.calculationHref}
      date={details.date}
    />
    <article className="markdown">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm, remarkSlug]}
      >
        {details.content}
      </ReactMarkdown>
    </article>
  </>
);

export default Details;
