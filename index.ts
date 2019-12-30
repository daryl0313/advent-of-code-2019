// Import stylesheets
import "./style.css";

import { getAnswer } from "./src/day1";

async function writeAnswer() {
  // Write TypeScript code!
  const appDiv: HTMLElement = document.getElementById("app");
  appDiv.innerHTML = `<h1>${await getAnswer()}</h1>`;
}

writeAnswer();
