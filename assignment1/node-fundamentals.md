# Node.js Fundamentals

## What is Node.js?
Node.js is a runtime environment that lets JavaScript run outside the browser, on my computer or on a server. It is not a new language. It's the same JavaScript, running in a different environment. Because it isn't inside the browser's sandbox, Node can do things like read and write files, start web servers, and read environment variables.

## How does Node.js differ from running JavaScript in the browser?
Browser JavaScript works with web pages. It has `window`, `document`, the DOM, cookies, and browser storage, and it runs in a sandbox so websites can't touch my files.
Node has no `window`, `document`, or DOM because there is no web page. Instead it gives backend tools: file system access (`fs`), process information (`process`, `process.env`, `process.argv`), `__dirname` and `__filename`, networking (`http`), and built-in modules like `path` and `os`. Node runs on the server, so it can safely use secrets like API keys and database passwords. Browser code can be inspected by users, so it shouldn't hold secrets.

## What is the V8 engine, and how does Node use it?
V8 is the JavaScript engine Google built for Chrome. An engine reads JavaScript code and turns it into fast machine instructions the computer can run. Node takes V8 out of the browser and adds extra features around it, like file and network access. So the same engine that runs JavaScript in Chrome also runs my code in Node.

## What are some key use cases for Node.js?
- Web APIs and servers that respond to requests from browsers or apps (for example with Express)
- Command-line tools (CLIs) that automate tasks in the terminal
- Real-time apps like chat apps or live dashboards
- Build tools and scripts that bundle code or process files

Node is strongest for I/O-heavy work (files, networks, databases). It is not the best choice for CPU-heavy work like image processing or machine learning.

## Explain the difference between CommonJS and ES Modules. Give a code example of each.

CommonJS is Node's original module system. It uses `require()` to import and `module.exports` to export, and it's what this course uses. ES Modules are the newer, official JavaScript standard used in browsers and React. They use `import` and `export`. In Node, ES Modules work in `.mjs` files or when `"type": "module"` is set in `package.json`. It's best not to mix the two styles in one project.

**CommonJS (default in Node.js):**
```js
// mathUtils.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require("./mathUtils");
console.log(add(2, 3)); // 5
```

**ES Modules (supported in modern Node.js):**
```js
// mathUtils.mjs
export function add(a, b) {
  return a + b;
}

// app.mjs
import { add } from "./mathUtils.mjs";
console.log(add(2, 3)); // 5
```