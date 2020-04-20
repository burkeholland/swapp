const cp = require("child_process");
const ora = require("ora");

const spinner = ora("Loading");

const az = {
  async uploadAppSettings(subscription, resourceGroup, appName, settings) {
    spinner.text = "Uploading local.settings.json...";
    spinner.start();

    let cmd = `az rest --method put --headers "Content-Type=application/json" --uri "/subscriptions/${subscription}/resourceGroups/${resourceGroup}/providers/Microsoft.Web/staticSites/${appName}/config/functionAppSettings?api-version=2019-12-01-preview" --body "${JSON.stringify(
      settings
    )
      .split('"')
      .join('\\"')}"`;

    const result = await exec(cmd);

    spinner.stop();

    return JSON.parse(result);
  },

  async getAppSettings(subscription, resourceGroup, appName) {
    spinner.text = "Getting application settings...";
    spinner.start();

    const cmd = `az rest --method post --uri "/subscriptions/${subscription}/resourceGroups/${resourceGroup}/providers/Microsoft.Web/staticSites/${appName}/listFunctionAppSettings?api-version=2019-12-01-preview"`;
    const result = await exec(cmd);

    spinner.stop();

    return JSON.parse(result);
  },

  async getSubscriptions() {
    spinner.text =
      "Checking to see what Azure Subscriptions you have available...";
    spinner.start();

    const result = await exec("az account list -o json");
    const json = JSON.parse(result);

    const subscriptions = json.map((item) => {
      return { name: item.name, value: item.id };
    });

    spinner.stop();

    return subscriptions;
  },
};

async function exec(cmd) {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, (error, stdin, stdout) => {
      if (error) reject(error);
      resolve(stdin);
    });
  });
}

module.exports = az;
