const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const ora = require("ora");
var inquirer = require("inquirer");

module.exports = {
  async execute(appname) {
    var advanced = [
      {
        type: "input",
        name: "env",
        message: "Enter your Discord bot token",
        validate: function (value) {
          var pass = false;
          if (value.length > 25) {
            pass = true;
          }
          if (pass) {
            return true;
          }

          return "Please enter a valid bot token";
        },
      },
    ];
    inquirer.prompt(advanced).then((choice) => {
      fs.mkdir(path.join(process.cwd(), appname), () => {
        console.log(chalk.green("Created basic template"));
      });
      var data = null;
      const spinner = ora("Loading files").start();
      console.log("");

      axios
        .get(
          "https://api.github.com/repos/Bot-Academia/disnode/contents/template/advanced"
        )
        .then(async (res) => {
          arr = res.data;
          var i = 0;
          while (i < arr.length) {
            name = arr[i].name;
            console.log("");
            console.log(name);
            if (arr[i].type === "file") {
              await axios
                .get(
                  `https://api.github.com/repos/Bot-Academia/disnode/contents/template/advanced/${name}`
                )
                .then((res) => {
                  text = res.data.content;
                  let buff = Buffer.from(text, "base64");
                  let data = buff.toString("ascii");
                  fs.appendFileSync(
                    path.join(process.cwd(), appname, name),
                    data,
                    function (e) {
                      if (e) console("some error");
                      console.log("Saved!");
                    }
                  );
                });
            } else {
              fs.mkdir(path.join(process.cwd(), appname, "commands"), () => {
                console.log(chalk.green("Creating commands"));
              });

              await axios
                .get(
                  "https://api.github.com/repos/Bot-Academia/disnode/contents/template/advanced/commands"
                )
                .then(async (res) => {
                  a = res.data;
                  var j = 0;
                  while (j < a.length) {
                    name = a[j].name;
                    console.log("");
                    console.log("commands/" + name);
                    if (a[j].type === "file") {
                      await axios
                        .get(
                          `https://api.github.com/repos/Bot-Academia/disnode/contents/template/advanced/commands/${name}`
                        )
                        .then((res) => {
                          text = res.data.content;
                          let buff = Buffer.from(text, "base64");
                          let data = buff.toString("ascii");
                          fs.appendFileSync(
                            path.join(process.cwd(), appname, "commands", name),
                            data,
                            function (e) {
                              if (e) console("some error");
                              console.log("Saved!");
                            }
                          );
                        });
                    }
                    j++;
                  }
                });
            } //else ends
            i++;
          }
          fs.appendFile(`${appname}/.env`, "BOT_TOKEN=" + choice.env, function (
            err
          ) {
            if (err) throw err;
            console.log(".env file created!");
          });
          spinner.stop();
        });
    });
  },
};
