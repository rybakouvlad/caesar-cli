const fs = require("fs");
const readline = require("readline");
const { pipeline } = require("stream/promises");
const { encode, decode } = require("./caesar");

const filePath = "./src/files/";
class EventsHandling {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  checkFile(name) {
    fs.access(filePath + `${name}`, fs.F_OK, (err) => {
      if (err) {
        console.error("File not exist");
        return false;
      }
      return true;
    });
  }

  inputStream = async (fileName, secret, action) => {
    console.log("Enter file");
    const stream = fs.createWriteStream(filePath + fileName, { flags: "a" });

    this.rl.on("line", (history) => {
      stream.write(
        (action ? encode(history, secret) : decode(history, secret)) + "\n"
      );
    });
  };

  writeFullData = async (inputFile, outputFile, secret, action) => {
    await pipeline(
      fs.createReadStream(filePath + inputFile, "utf8"),
      async function* (source) {
        source.setEncoding("utf8");
        for await (const chunk of source) {
          yield action ? encode(chunk, secret) : decode(chunk, secret);
        }
      },
      fs.createWriteStream(filePath + outputFile, { flags: "a" })
    );
    console.log(`File ${outputFile} ready!`);
    process.exit(0);
  };

  readStream = async (fileName, secret, action) => {
    const stream = fs.createReadStream(filePath + fileName, "utf8");
    stream.once("data", (data) => {
      console.log("Result:");
      console.log(action ? encode(data, secret) : decode(data, secret));
      process.exit(0);
    });
  };
  consoleStream = async (secret, action) => {
    console.log("Enter data:");
    this.rl.on("line", (history) => {
      console.log(action ? encode(history, secret) : decode(history, secret));
      process.exit(0);
    });
  };
}

module.exports = {
  EventsHandling,
};
