# swapp

Upload `local.settings.json` to an [Azure Static Web App](aka.ms/swadocs).


## Prerequisites

- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=devcloud-0000-buhollan)
- A `local.settings.json` file

### How to use

#### Upload settings

This module requires that a `local.settings.json` file to be present in the directory where you run the command.

From the directory that contains your `local.settings.json` file...

```bash
npx swapp upload
```

#### List settings

From any directory...

```bash
npx swapp list
```
