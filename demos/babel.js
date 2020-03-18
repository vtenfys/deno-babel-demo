const { transform } = require("@babel/core");

const code = `
  import name from "./name.js";
  console.log(\`Hello, \${name}!\`);
  console.log(<p id="my-paragraph">This is JSX!</p>);
`;

const presets = [require("@babel/preset-env"), require("@babel/preset-react")];
console.log(transform(code, { presets }).code);
