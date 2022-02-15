// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import {
  viewInJsonHero,
  viewInJsonHeroAtPath,
} from "./commands/viewInJsonHero";

export function activate(context: vscode.ExtensionContext) {
  const viewInJsonHeroDisposable = vscode.commands.registerTextEditorCommand(
    "jsonhero.viewInJsonHero",
    viewInJsonHero
  );

  context.subscriptions.push(viewInJsonHeroDisposable);

  const viewInJsonHeroAtPathDisposable =
    vscode.commands.registerTextEditorCommand(
      "jsonhero.viewInJsonHeroAtPath",
      viewInJsonHeroAtPath
    );

  context.subscriptions.push(viewInJsonHeroAtPathDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
