// Import stylesheets
import "./style.css";

import { getAnswer } from "./src/day2";

async function writeAnswer() {
  // Write TypeScript code!
  const appDiv: HTMLElement = document.getElementById("app");
  appDiv.innerHTML = `<pre>${JSON.stringify(await getAnswer(), undefined, 2)}</pre>`;
}

writeAnswer();
