module.exports = {
  siteMetadata: {
    title: "Gatsby SVG Transformer",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "data", path: `${__dirname}/data` },
    },
    { resolve: require.resolve("..") },
  ],
};
