const inquirer = require("inquirer");
const az = require("../shared/az");
const chalk = require("chalk");

async function execute() {
  try {
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
    ]);

    const settings = await az.getAppSettings(
      result.subscription,
      result.resourceGroup,
      result.appName
    );

    console.log(
      `${chalk.green("✔︎")} Application settings for ${result.appName}:`
    );
    console.log(settings.properties);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { execute: execute };
