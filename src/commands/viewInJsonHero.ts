import { basename } from "path";
import {
  Selection,
  TextEditor,
  TextEditorEdit,
  window,
  workspace,
} from "vscode";
import { createNewDocument } from "../services/jsonHero";
import open = require("open");
import { parse } from "json-source-map";
import { JSONHeroPath } from "@jsonhero/path";

export function viewInJsonHero(textEditor: TextEditor, edit: TextEditorEdit) {
  const text = getTextOrSelection(textEditor);
  const fileUri = textEditor.document.fileName;
  const title = basename(fileUri);

  try {
    const content = JSON.parse(text);

    if (!content) {
      window.showWarningMessage(
        "No content to view in JSON Hero. Make sure you haven't selected text that is not valid JSON or is null or undefined."
      );
      return;
    }

    createNewDocument(title, content)
      .then((response) => {
        if (!response.location) {
          window.showErrorMessage("No location found in JSON Hero response.");
          return;
        }

        return openInBrowser(response.location);
      })
      .catch((error) => {
        window.showErrorMessage(error.message);
      });
  } catch (e) {
    if (e instanceof SyntaxError) {
      window.showErrorMessage(`Invalid JSON: ${e.message}`);
    } else if (e instanceof Error) {
      window.showErrorMessage(`Error: ${e.message}`);
    }
  }
}

export function viewInJsonHeroAtPath(
  textEditor: TextEditor,
  edit: TextEditorEdit
) {
  const text = getTextOrSelection(textEditor);
  const fileUri = textEditor.document.fileName;
  const title = basename(fileUri);

  try {
    const content = JSON.parse(text);

    createNewDocument(title, content)
      .then((response) => {
        if (!response.location) {
          window.showErrorMessage("No location found in JSON Hero response.");
          return;
        }

        const url = new URL(response.location);

        const path = getPathAtSelection(text, textEditor.selection);

        if (path) {
          url.searchParams.append("path", path);
        }

        return openInBrowser(url.toString());
      })
      .catch((error) => {
        window.showErrorMessage(error.message);
      });
  } catch (e) {
    if (e instanceof SyntaxError) {
      window.showErrorMessage(`Invalid JSON: ${e.message}`);
    } else if (e instanceof Error) {
      window.showErrorMessage(`Error: ${e.message}`);
    }
  }
}

async function openInBrowser(url: string): Promise<void> {
  const config = workspace.getConfiguration("jsonhero");

  if (config.get("openInDefaultBrowser")) {
    await open(url);
  } else {
    const browser = config.get("customBrowser") as
      | "chrome"
      | "firefox"
      | "safari"
      | "edge"
      | undefined;

    if (!browser) {
      await open(url);
      return;
    }

    if (browser === "chrome") {
      await open(url, { app: { name: open.apps.chrome } });
    } else if (browser === "firefox") {
      await open(url, { app: { name: open.apps.firefox } });
    } else if (browser === "edge") {
      await open(url, { app: { name: open.apps.edge } });
    } else if (browser === "safari") {
      await open(url, { app: { name: "Safari" } });
    }

    await open(url, { app: { name: browser } });
  }
}

function getTextOrSelection(textEditor: TextEditor): string {
  if (textEditor.selection.isEmpty) {
    return textEditor.document.getText();
  }

  return textEditor.document.getText(textEditor.selection);
}

function getPathAtSelection(
  text: string,
  selection: Selection
): string | undefined {
  const parsed = parse(text);

  // Find the key if the selected line using jsonMapped.pointers
  const pointerEntry = Object.entries(parsed.pointers).find(
    ([pointer, info]) => {
      return info.value.line === selection.active.line;
    }
  );

  if (!pointerEntry) {
    return;
  }

  const [pointer] = pointerEntry;

  const path = JSONHeroPath.fromPointer(pointer);

  return path.toString();
}
