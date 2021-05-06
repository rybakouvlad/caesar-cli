const { Command } = require("commander");
const program = new Command();

console.log("kuku");

program
  .option("-s, --shift <number>", "a shift")
  .option("-i, --input <type>", "an input file")
  .option("-o, --output <type>", "an output file")
  .option("-a, --action <type>", "an action encode/decode");

const options = program.parse();

console.log(options.opts());