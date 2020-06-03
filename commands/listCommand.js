const inquirer = require("inquirer");
const az = require("../shared/az");
const chalk = require("chalk");

async function execute() {
  try {
    let subscriptionId;
    const currentSubscription = await az.getCurrentSubscription();

    let subPrompt = await inquirer.prompt([
      {
        type: "confirm",
        name: "useDefaultSubscription",
        message: `Using subscription: ${currentSubscription.name}. Select "n" to choose a different subscription`,
      },
    ]);

    if (subPrompt.useDefaultSubscription) {
      subscriptionId = currentSubscription.id;
    } else {
      const subscriptions = await az.getSubscriptions();
      subPrompt = await inquirer.prompt([
        {
          type: "list",
          name: "subscriptionId",
          message: "Select a subscription",
          choices: subscriptions,
        },
      ]);

      subscriptionId = subPrompt.subscriptionId;
    }

    let result = await inquirer.prompt([
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
      subscriptionId,
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
