# @paulkre/gatsby-transformer-svg

Inline and optimize SVG's from your GraphQL data source

## Installation

```sh
yarn add @paulkre/gatsby-transformer-svg
```

## Usage

### gatsby-config.js

```js
module.exports = {
  plugins: ["@paulkre/gatsby-transformer-svg"],
};
```

### GraphQL Query

```graphql
file {
    childInlineSvg {
        content
    }
    url
}
```

### Rendering

```jsx
import React from "react";

export default function Image({ file }) {
  // inlined SVG
  if (file?.childInlineSvg?.content) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: file?.childInlineSvg?.content }}
      />
    );
  }

  // other images
  return <img src={file.url} alt={alt} />;
}
```
