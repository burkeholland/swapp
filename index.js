const { program } = require("commander");
const uploadCommand = require("./commands/uploadCommand");
const listCommand = require("./commands/listCommand");

program.version("0.0.1");

program
  .command("upload")
  .description("Uploads local.settings.json to an Azure Static App")
  .action(() => {
    uploadCommand.execute();
  });

program
  .command("list")
  .description("List all App Settings for a Static App")
  .action(() => {
    listCommand.execute();
  });

program.parse(process.argv);
