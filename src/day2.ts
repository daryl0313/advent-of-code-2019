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

function getOutput(noun: number, verb: number) {
  const inputs = input.split(",").map(i => +i);
  inputs[1] = noun;
  inputs[2] = verb;

  let pointer = 0;
  do {
    const operation = getOperation(inputs[pointer]);
    if (operation === "END") {
      pointer = null;
      break;
    }
    const parameter1Index = inputs[pointer + 1];
    const parameter2Index = inputs[pointer + 2];
    const writeIndex = inputs[pointer + 3];
    pointer += 4;

    if (operation === "add") {
      inputs[writeIndex] = inputs[parameter1Index] + inputs[parameter2Index];
    } else {
      inputs[writeIndex] = inputs[parameter1Index] * inputs[parameter2Index];
    }
  } while (pointer);
  return inputs[0];
}

// Part 1
// export function getAnswer() {
//   const inputs = input.split(",").map(i => +i);
//   return getOutput(12, 2);
// }

// Part 2
export function getAnswer() {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = noun + 1; verb < 100; verb++) {
      const output = getOutput(noun, verb);
      if (output === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
  throw new Error('Failed to find inputs');
}
