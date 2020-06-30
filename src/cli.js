const program = require("commander");
const showBanner = require("node-banner");
const { version } = require("../package");

// register version flag
program.version(version);

// define usage information
// program.usage('<command> [options]')

(async () => {
  await showBanner("Disnode", "CLI tool for discord.js");
})();
// parse args
program.parse(process.argv);
