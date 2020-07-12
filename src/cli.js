"use strict";
const program = require("commander");
const showBanner = require("node-banner");
const { version } = require("../package");
const chalk = require("chalk");

const create = require("../commands/create");
const pkg = require("../package");

// register version flag
// program.version(version);

program.version(pkg.version).usage("<command> [options]");

program
  .command("create <botname>")
  .description("create a discord.js template")
  .action((appname) => {
    create.execute(appname);
  });

// parse args
program.parse(process.argv);

program.arguments("<command>").action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});
