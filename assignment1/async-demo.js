const fs = require("fs");
const path = require("path");

const sampleFilesDir = path.join(__dirname, "sample-files");
const filePath = path.join(sampleFilesDir, "sample.txt");

// Write a sample file for demonstration
// (Sync is OK here because it's a one-time setup step in a small script,
// and we need the file to exist before we try to read it.)
fs.mkdirSync(sampleFilesDir, { recursive: true });
fs.writeFileSync(filePath, "Hello, async world!");

// 1. Callback style
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("Callback read failed:", err.message);
    return;
  }
  console.log("Callback read:", data);
});

// Callback hell example (test and leave it in comments):
// Each step needs the result of the one before it, so every new step
// has to go INSIDE the previous callback. The code keeps drifting to the
// right and gets very hard to read and debug.
//
// fs.readFile(filePath, 'utf8', (err, data1) => {
//   if (err) return console.log(err.message);
//   fs.writeFile(filePath, data1 + ' again', (err) => {
//     if (err) return console.log(err.message);
//     fs.readFile(filePath, 'utf8', (err, data2) => {
//       if (err) return console.log(err.message);
//       fs.writeFile(filePath, data2 + ' and again', (err) => {
//         if (err) return console.log(err.message);
//         console.log('Finally done!');
//       });
//     });
//   });
// });

// 2. Promise style
fs.promises
  .readFile(filePath, "utf8")
  .then((data) => {
    console.log("Promise read:", data);
  })
  .catch((err) => {
    console.log("Promise read failed:", err.message);
  });

// 3. Async/Await style
async function readWithAsyncAwait() {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    console.log("Async/Await read:", data);
  } catch (err) {
    console.log("Async/Await read failed:", err.message);
  }
}

readWithAsyncAwait();
