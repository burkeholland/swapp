const chalk = require("chalk");
const inquirer = require("inquirer");
const az = require("../shared/az");

let localSettingsFile = getLocalSettingsFile();

async function execute() {
  try {
    // read the file for settings
    let settings = { properties: localSettingsFile.Values };

    // make sure settings exist before we try anything else
    if (localSettingsFile.Values) {
      console.log(`${chalk.green("✔︎")} Found local.settings.json file...`);

      const subscriptions = await az.getSubscriptions();

      let result = await inquirer.prompt([
        {
          type: "list",
          name: "subscription",
          message: "Select a subscription",
          choices: subscriptions,
        },
        {
          type: "input",
          name: "resourceGroup",
          message: "Enter the resource group name:",
        },
        {
          type: "input",
          name: "appName",
          message: "Enter the name of your Static App:",
        },
        {
          type: "confirm",
          name: "confirm",
          message: (answers) => {
            return `You are about to upload your local application settings to "${answers.appName}". This will overwrite any settings that you have. It will not delete any settings. Are you sure you want to continue?`;
          },
        },
      ]);

      if (result.confirm) {
        await az.uploadAppSettings(
          result.subscription,
          result.resourceGroup,
          result.appName,
          settings
        );

        console.log(`${chalk.green("✔︎")} Settings successfully uploaded`);
      }
    } else {
      handleError(
        "The local.settings.json file is present, but no settings were found to upload."
      );
    }
  } catch (err) {
    handleError(err.message);
  }
}

function getLocalSettingsFile() {
  try {
    return require(`${process.cwd()}/local.settings.json`);
  } catch (error) {
    handleError(
      "Cannot locate a local.settings.json file in the current directory"
    );
  }
}

function handleError(message) {
  console.log(`${chalk.green("🔴")} ${message}`);
  process.exit();
}

module.exports = { execute: execute };
