# JSON Hero support for VS Code

Quickly view JSON in jsonhero.io

## Features

### View in jsonhero.io

Run command "**View in jsonhero.io**" to view the open file in jsonhero.io

<p><img src="https://github.com/jsonhero-io/vscode-extension/raw/main/assets/jsonhero-viewinjsonhero.gif" alt="View in jsonhero.io" width="1000px"></p>

You can also view the selected JSON only using the same command:

<p><img src="https://github.com/jsonhero-io/vscode-extension/raw/main/assets/jsonhero-viewinjsonheroselection.gif" alt="View in jsonhero.io" width="1000px"></p>

### View in jsonhero.io at path

View the JSON file, opened at the location of the cursor (useful for opening onto the exact part of the document you want to preview)

<p><img src="https://github.com/jsonhero-io/vscode-extension/raw/main/assets/jsonhero-viewinjsonheroatpath.gif" alt="View in jsonhero.io" width="1000px"></p>

## Extension Settings

This extension contributes the following settings:

- `jsonhero.openInDefaultBrowser`: Open jsonhero.io in your default browser (true by default)
- `jsonhero.customBrowser`: If `openInDefaultBrowser` is set to false, use this setting to set the browser to use. One of `chrome`, `firefox`, `edge`, or `safari`. Defaults to `chrome`.
- `jsonhero.url`: Allows you to point to a different instance of JSON Hero (if you are running it locally or have deployed it yourself). Defaults to `https://jsonhero.io`

## Known Issues

Currently no known issues

## Release Notes

### 0.1.0

Initial release of the extension
