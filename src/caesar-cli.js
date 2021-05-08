const { Command } = require("commander");
const program = new Command();
const { EventsHandling } = require("./stream");
const eventsHandling = new EventsHandling();

program
  .option("-s, --shift <number>", "a shift")
  .option("-i, --input <type>", "an input file")
  .option("-o, --output <type>", "an output file")
  .option("-a, --action <type>", "an action encode/decode");

const options = program.parse();

async function run() {
  let action = true;

  if (!options.opts().shift || !options.opts().action) {
    console.error("Incorrect action or shift");
    process.exit(1);
  }

  if (options.opts().action === "encode") {
    action = true;
  } else if (options.opts().action === "decode") {
    action = false;
  } else {
    console.error("Incorrect action");
    process.exit(1);
  }

  if (options.opts().input && options.opts().output) {
    if (eventsHandling.checkFile(options.opts().input)) {
      return;
    }

    try {
      await eventsHandling.writeFullData(
        options.opts().input,
        options.opts().output,
        options.opts().shift,
        action
      );
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }
  if (options.opts().output) {
    try {
      await eventsHandling.inputStream(
        options.opts().output,
        options.opts().shift,
        action
      );
    } catch (error) {}
    return;
  }
  if (options.opts().input) {
    if (eventsHandling.checkFile(options.opts().input)) {
      return;
    }
    try {
      await eventsHandling.readStream(
        options.opts().input,
        options.opts().shift,
        action
      );
    } catch (error) {}
    return;
  }
  eventsHandling.consoleStream(options.opts().shift, action);
}

run();
