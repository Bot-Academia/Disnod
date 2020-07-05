const showBanner = require("node-banner");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const ora = require("ora");

module.exports = {
  async execute(appname) {
    await showBanner("DisNode", "CLI tool for discord.js");
    console.log("");

    fs.mkdir(path.join(process.cwd(), appname), () => {
      console.log(chalk.green("Created basic template"));
    });

    var data = null;
    const spinner = ora("Loading files").start();
    console.log("");
    axios
      .get("https://api.github.com/repos/Bot-Academia/gitty/contents/index.js")
      .then((res) => {
        text = res.data.content;
        let buff = new Buffer(text, "base64");
        let data = buff.toString("ascii");
        fs.writeFile(
          path.join(process.cwd(), `${appname}/index.js`),
          data,
          function (e) {
            if (e) console("some error");
            spinner.stop();
            console.log("Saved!");
          }
        );
      });
  },
};
