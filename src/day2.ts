import { input } from "./day2.input";

type IntOperation = "add" | "multiply" | "END";

function getOperation(intCode: number): IntOperation {
  switch (intCode) {
    case 1:
      return "add";
    case 2:
      return "multiply";
    case 99:
      return "END";
    default:
      throw new Error("Unknown IntCode");
  }
}

// Part 1
export function getAnswer() {
  // const input = "1,1,1,4,99,5,6,0,99";
  const inputs = input.split(",").map(i => +i);

  inputs[1] = 12;
  inputs[2] = 2;

  let i = 0;
  do {
    const operation = getOperation(inputs[i]);
    if (operation === "END") {
      i = null;
      break;
    }
    const input1Index = inputs[i + 1];
    const input2Index = inputs[i + 2];
    const writeIndex = inputs[i + 3];
    i += 4;

    if (operation === "add") {
      inputs[writeIndex] = inputs[input1Index] + inputs[input2Index];
    } else {
      inputs[writeIndex] = inputs[input1Index] * inputs[input2Index];
    }
  } while (i);
  return inputs[0];
}

// Part 2
