import { createRequire } from "https://deno.land/std/node/module.ts";
import { process } from "https://deno.land/std/node/process.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";

globalThis.process = process;
globalThis.Buffer = Deno.Buffer;
globalThis._fs = { existsSync, statSync: Deno.statSync };

const require = createRequire(import.meta.url);
require(Deno.args[0]);
