import fetch from "node-fetch";
import { workspace } from "vscode";

export async function createNewDocument(
  title: string,
  json: any
): Promise<{ id: string; location: string }> {
  const options = {
    method: "POST",
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content: json,
    }),
  };

  const config = workspace.getConfiguration("jsonhero");
  const baseURI = config.get("url");

  const response = await fetch(`${baseURI}/api/create.json`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
}
