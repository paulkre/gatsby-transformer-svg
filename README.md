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

Optionally, you can also override the [SVGO options](https://github.com/svg/svgo#configuration) which are being used internally to optimize the `.svg` files:

```js
module.exports = {
  plugins: [
    {
      resolve: "@paulkre/gatsby-transformer-svg",
      options: {
        svgo: {
          multipass: true,
          floatPrecision: 2,
          plugins: [
            // ...
          ],
        },
      },
    },
  ],
};
```

### GraphQL Query

```graphql
file {
  childSvg {
    content {
      data
      width
      height
    }
  }
}
```

### Rendering

```jsx
import React from "react";

export default function Image({ file }) {
  if (file?.childSvg?.content) {
    return (
      <div dangerouslySetInnerHTML={{ __html: file?.childSvg?.content.data }} />
    );
  }
}
```
