# Deno Babel Demo

## What is this?

This project demonstrates a proof-of-concept using Deno to transform code with Babel.

## How do I try it?

1. Clone this repo, e.g.

   ```sh
   git clone https://github.com/davidbailey00/deno-babel-demo
   cd deno-babel-demo
   ```

2. Run `npm install`

3. Run `npm run demo` (or `deno -A loader.js ./demos/babel`)

## How does it work?

Deno has a semi-complete [Node.js compatibility library](https://deno.land/std/node/), and in addition, some Node.js standard packages have been ported to browsers and published to NPM (e.g. `assert` and `util`, both of which are used in this demo). By using these as polyfills, we can emulate a substantial amount of the Node.js environment.

Some files also need to be patched in cases where part of the Node.js standard library hasn't yet been ported to Deno, and/or where the behaviour is subtly different - have a look at `scripts/patch-modules.js` to see what changes have been made.
