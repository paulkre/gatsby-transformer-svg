import * as React from "react";
import { graphql } from "gatsby";

export const query = graphql`
  query {
    file {
      childSvg {
        content {
          data
        }
      }
    }
  }
`;

const Page = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data.file.childSvg.content.data }}
    />
  );
};

export default Page;
