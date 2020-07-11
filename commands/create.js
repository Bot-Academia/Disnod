const showBanner = require("node-banner");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const ora = require("ora");
var inquirer = require("inquirer");
const basic = require("../controllers/basic");
const default_control = require("../controllers/default");
const advanced = require("../controllers/advanced");

module.exports = {
  async execute(appname) {
    await showBanner("DisNode", "CLI tool for discord.js");
    console.log("");

    var questions = [
      {
        type: "list",
        name: "template",
        message: "Select template:",
        choices: ["basic", "default (recommended)", "advanced"],
        filter: function (val) {
          return val.toLowerCase();
        },
      },
      {
        type: "input",
        name: "author",
        message: "Author name",
        default: "(john)",
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      if (answers.template === "basic") {
        basic.execute(appname, answers.author);
      }

      if (answers.template === "default (recommended)") {
        console.log("default");
        default_control.execute(appname, answers.author);
      }

      if (answers.template === "advanced") {
        console.log("advanced");
        advanced.execute(appname, answers.author);
      }
    });
  },
};
