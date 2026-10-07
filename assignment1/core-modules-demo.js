const os = require("os");
const path = require("path");
const fs = require("fs");

const sampleFilesDir = path.join(__dirname, "sample-files");
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true });
}

async function main() {
  // OS module
  console.log("Platform:", os.platform());
  console.log("CPU:", os.cpus()[0].model);
  console.log("Total Memory:", os.totalmem());

  // Path module
  const joinedPath = path.join(sampleFilesDir, "folder", "file.txt");
  console.log("Joined path:", joinedPath);

  // fs.promises API
  const demoFile = path.join(sampleFilesDir, "demo.txt");
  try {
    await fs.promises.writeFile(demoFile, "Hello from fs.promises!");
    const content = await fs.promises.readFile(demoFile, "utf8");
    console.log("fs.promises read:", content);
  } catch (err) {
    console.log("fs.promises failed:", err.message);
  }

  // Streams for large files- log first 40 chars of each chunk
  // (Optional Task 5)
  const largeFile = path.join(sampleFilesDir, "largefile.txt");

  // Build a big file: 100 lines of text
  let lines = "";
  for (let i = 1; i <= 100; i++) {
    lines += `This is line ${i} in a large file used to practice streams.\n`;
  }
  await fs.promises.writeFile(largeFile, lines);

  // Read it back in chunks of about 1KB
  const readStream = fs.createReadStream(largeFile, {
    encoding: "utf8",
    highWaterMark: 1024,
  });

  readStream.on("data", (chunk) => {
    console.log("Read chunk:", chunk.slice(0, 40));
  });

  readStream.on("end", () => {
    console.log("Finished reading large file with streams.");
  });

  readStream.on("error", (err) => {
    console.log("Stream failed:", err.message);
  });
}

main();
