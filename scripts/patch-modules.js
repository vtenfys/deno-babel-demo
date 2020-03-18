const replace = require("replace-in-file");

async function main() {
  // tty isn't ported to Deno yet
  await replace({
    files: "node_modules/debug/src/node.js",
    from: ["const tty ", "tty.isatty(process.stderr.fd)"],
    to: ["// const tty ", "false"]
  });

  // Deno's util port is missing `inspect` so use npm:util
  await replace({
    files: "node_modules/regenerator-transform/lib/leap.js",
    from: 'require("util")',
    to: 'require("../../util")'
  });

  // 1. Deno's fs port hasn't implemented statSync yet
  // 2. The function we're patching sometimes catches an error and returns null
  //    but Deno's errors have different signatures, so just always return null
  await replace({
    files: "node_modules/@babel/core/lib/config/files/utils.js",
    from: "+_fs2().default.statSync(filepath).mtime",
    to: "null"
  });

  // 1. Deno's fs port hasn't implemented existsSync
  //    or statSync - map these to the stdlib aliases
  // 2. Deno's JSON.parse only accepts strings, not buffers
  await replace({
    files: "node_modules/browserslist/node.js",
    from: [
      "fs.existsSync(file) && fs.statSync(file)",
      "JSON.parse(fs.readFileSync(file))"
    ],
    to: [
      "(fs.existsSync||_fs.existsSync)(file) && (fs.statSync||_fs.statSync)(file)",
      "JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}))"
    ]
  });
}

main();
