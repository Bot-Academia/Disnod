const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const ora = require("ora");
const execa = require("execa");

module.exports = {
  async execute(appname, author) {
    fs.mkdir(path.join(process.cwd(), appname), () => {
      console.log(chalk.green("Created basic template"));
    });
    var data = null;
    const spinner = ora("Loading files").start();
    console.log("");

    axios
      .get(
        "https://api.github.com/repos/Bot-Academia/disnode/contents/template/basic"
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
              `https://api.github.com/repos/Bot-Academia/disnode/contents/template/basic/${name}`
            )
            .then((res) => {
              text = res.data.content;
              let buff = Buffer.from(text, "base64");
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
        fs.readFile(`${appname}/package.json`, "utf-8", function (err, data) {
          if (err) throw err;

          var newValue = data.replace(
            /"author": "",/gim,
            ` "author": "` + author + `",`
          );

          fs.writeFile(`${appname}/package.json`, newValue, "utf-8", function (
            err,
            data
          ) {
            if (err) throw err;
          });
        });
        fs.readFile(`${appname}/package.json`, "utf-8", function (err, data) {
          if (err) throw err;

          var newValue = data.replace(
            /"name": "discordbot",/gim,
            ` "name": "` + appname + `",`
          );

          fs.writeFile(`${appname}/package.json`, newValue, "utf-8", function (
            err,
            data
          ) {
            if (err) throw err;
            console.log("\n \n");
            console.log(
              chalk.red("Follow the given commands to run your bot!")
            );
            console.log(`  ` + chalk.green(`\n  cd ${appname}`));
            console.log(`  ` + chalk.green(`\n  npm install`));
            console.log(`  ` + chalk.green(`\n  npm start`));
          });
        });
        try {
          await execa("npm", ["install"], {
            cwd: process.cwd() + "/" + appname,
          });
        } catch (err) {
          console.log(err);
          throw err;
        }
        spinner.stop();
      });
  },
};
