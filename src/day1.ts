import { input } from "./day1.input";

// Part 1
// export function getAnswer() {
//   return input.reduce((acc, cur) => {
//     let fuel = Math.floor(cur / 3) - 2;
//     return acc + fuel;
//   }, 0);
// }

// Part 2
export function getAnswer() {
  return input.reduce((acc, cur) => {
    let fuel = getFuelConsumtion(cur);
    return acc + fuel;
  }, 0);
}

function getFuelConsumtion(mass: number) {
  let result = Math.max(Math.floor(mass / 3) - 2, 0);
  if (result > 0) {
    result += getFuelConsumtion(result);
  }
  return result;
}
