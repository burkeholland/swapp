# upload-settings

Upload `local.settings.json` to a Static App.

## Prerequisites

- Azure CLI
- A `local.settings.json` file

### How to use

#### Upload settings

This module requires that a `local.settings.json` file to be present in the directory where you run the command.

From the directory that contains your `local.settings.json` file...

```bash
npx upload-settings
```

If you are testing locally...

```bash
npx ~/path/to/static-apps-env
```

#### List settings

From any directory
