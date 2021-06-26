const fs = require("fs").promises;

const { optimize: optimizeSVG } = require("svgo");

const svgoOptions = {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    // Default
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "cleanupAttrs",
    "mergeStyles",
    "inlineStyles",
    "minifyStyles",
    "cleanupIDs",
    "removeUselessDefs",
    "cleanupNumericValues",
    "convertColors",
    "removeUnknownsAndDefaults",
    "removeNonInheritableGroupAttrs",
    "removeUselessStrokeAndFill",
    // "removeViewBox",
    "cleanupEnableBackground",
    "removeHiddenElems",
    "removeEmptyText",
    "convertShapeToPath",
    "convertEllipseToCircle",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    "collapseGroups",
    "convertPathData",
    "convertTransform",
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "mergePaths",
    "removeUnusedNS",
    "sortDefsChildren",
    "removeTitle",
    "removeDesc",

    // Custom
    "removeXMLNS",
  ],
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
  type SvgContent {
    data: String!
    width: Int
    height: Int
  }

  type Svg implements Node @childOf(types: ["File"], mimeTypes: ["image/svg+xml"]) {
    content: SvgContent
  }`);
};

exports.onCreateNode = function({ node, actions, createNodeId }) {
  const { createNode, createParentChildLink } = actions;
  if (node.extension !== "svg") return;

  const svgNode = {
    id: createNodeId(`${node.id} >> Svg`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: `${node.internal.contentDigest}`,
      type: `Svg`,
    },
  };

  createNode(svgNode);
  createParentChildLink({ parent: node, child: svgNode });
};

exports.createResolvers = ({
  createResolvers,
  getNodeAndSavePathDependency,
}) => {
  createResolvers({
    Svg: {
      content: {
        async resolve(image, _fieldArgs, context) {
          const { absolutePath } = getNodeAndSavePathDependency(
            image.parent,
            context.path
          );
          const svg = await fs.readFile(absolutePath);

          if (!svg) return null;

          try {
            const {
              data,
              info: { width, height },
            } = optimizeSVG(svg, {
              path: absolutePath,
              ...svgoOptions,
            });

            return { data, width, height };
          } catch (err) {
            return null;
          }
        },
      },
    },
  });
};
