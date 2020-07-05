const showBanner = require("node-banner");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");

module.exports = {
  async execute(appname) {
    await showBanner("DisNode", "CLI tool for discord.js");
    console.log("");

    fs.mkdir(path.join(process.cwd(), appname), () => {
      console.log(chalk.green("Created basic template"));
    });

    var data = null;
    axios
      .get(
        "https://api.github.com/repos/Bot-Academia/gitty/contents/index.js",
        {
          headers: {
            authorization:
              "token " + "ddefecd775fc87c44c9d7fc14018bb7980396f89",
          },
        }
      )
      .then((res) => {
        text = res.data.content;
        let buff = new Buffer(text, "base64");
        let data = buff.toString("ascii");
        fs.writeFile(
          path.join(process.cwd(), `${appname}/index.js`),
          data,
          function (e) {
            if (e) throw e;
            console.log("Saved!");
          }
        );
      });
  },
};
