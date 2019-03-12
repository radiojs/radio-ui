import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
// import sass from "rollup-plugin-sass";
// import postcss from "rollup-plugin-postcss";
// import collectSass from "rollup-plugin-collect-sass";
import copy from 'rollup-plugin-copy-glob';

const globals = {
  react: "React",
  "react-dom": "ReactDOM"
};

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true
};

const commonjsOptions = {
  include: /node_modules/,
  namedExports: {
    "prop-types": ["object", "oneOfType", "element", "bool", "func"],
    "draft-js/lib/Draft.js": ["Editor", "EditorState", "RichUtils"]
  }
};

const input = "./src/index.js";

const output = {
  file: "dist/radio-ui.js",
  format: "cjs",
  globals,
};

export default {
  input,
  output,
  external: Object.keys(globals),
  plugins: [
    nodeResolve(),
    babel(babelOptions),
    commonjs(commonjsOptions),
    replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
    sizeSnapshot(),
    copy([
      { files: 'src/**/*.scss', dest: 'dist/scss' }
    ])
  ],
  context: "this"
};
