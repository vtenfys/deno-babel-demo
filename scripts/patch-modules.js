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
}

main();
