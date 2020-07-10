const showBanner = require("node-banner");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const ora = require("ora");
var inquirer = require("inquirer");

module.exports = {
  async execute(appname) {
    await showBanner("DisNode", "CLI tool for discord.js");
    console.log("");

    var inquirer = require("inquirer");

    console.log("Hi, welcome to Node Pizza");

    var questions = [
      {
        type: "confirm",
        name: "template",
        message: "Do you want a template?",
        default: false,
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      if (answers.template == true) {
        fs.mkdir(path.join(process.cwd(), appname), () => {
          console.log(chalk.green("Created basic template"));
        });

        var data = null;
        const spinner = ora("Loading files").start();
        console.log("");

        axios
          .get(
            "https://api.github.com/repos/Bot-Academia/disnode/contents/template"
          )
          .then(async (res) => {
            arr = res.data;
            var i = 0;
            while (i < arr.length) {
              name = arr[i].name;
              console.log("");
              console.log(name);
              await axios
                .get(
                  `https://api.github.com/repos/Bot-Academia/disnode/contents/template/${name}`
                )
                .then((res) => {
                  text = res.data.content;
                  let buff = new Buffer(text, "base64");
                  let data = buff.toString("ascii");
                  fs.appendFileSync(
                    path.join(process.cwd(), `${appname}/${name}`),
                    data,
                    function (e) {
                      if (e) console("some error");
                      console.log("Saved!");
                    }
                  );
                });
              i++;
            }
            spinner.stop();
          });
      }
    });
  },
};
