import { input } from './day3.input';

const validDirections = ['R', 'L', 'U', 'D'] as const;
type Direction = typeof validDirections[number];
interface Coordinates { x: number; y: number; };

function assertDirection(char: string): asserts char is Direction {
    if (!(validDirections as any).includes(char)) {
        throw new Error(`Invalid direction, ${char}`)
    }
}

function getDirection(instruction: string): Direction {
    const dir = instruction[0];
    assertDirection(dir);
    return dir;
}

function getInstructionLength(instruction: string): number {
    const length = parseInt(instruction.slice(1), 10);
    if (isNaN(length)) {
        throw new Error(`Invalid length, ${length}`);
    }
    return length;
}

function getNextCoordinates(coordinates: Coordinates, direction: Direction): Coordinates {
    const { x, y } = coordinates;

    switch (direction) {
        case 'R':
            return { ...coordinates, x: x + 1 };
        case 'L':
            return { ...coordinates, x: x - 1 };
        case 'U':
            return { ...coordinates, y: y + 1 };
        case 'D':
            return { ...coordinates, y: y - 1 };
    }
}

export function getAnswer() {
    let currentStep = 0;

    const graph: { [x: number]: { [y: number]: number } } = {};
    let currentCoordinates: Coordinates = { x: 0, y: 0 };
    input.wire1.forEach(instruction => {
        const dir = getDirection(instruction);
        const length = getInstructionLength(instruction);

        for (let i = 1; i <= length; i++) {
            currentStep += 1;
            currentCoordinates = getNextCoordinates(currentCoordinates, dir);
            graph[currentCoordinates.x] = { ...graph[currentCoordinates.x], [currentCoordinates.y]: currentStep };
        }
    });

    currentStep = 0;
    currentCoordinates = { x: 0, y: 0 };

    // This is used for part 1
    const intersectDistances: number[] = [];

    // This is used for part 2
    const steps: number[] = [];

    input.wire2.forEach(instruction => {
        const dir = getDirection(instruction);
        const length = getInstructionLength(instruction);

        for (let i = 1; i <= length; i++) {
            currentStep += 1;
            currentCoordinates = getNextCoordinates(currentCoordinates, dir);
            const wire1Steps = graph[currentCoordinates.x]?.[currentCoordinates.y];
            if (wire1Steps) {
                intersectDistances.push(Math.abs(currentCoordinates.x) + Math.abs(currentCoordinates.y));
                steps.push(wire1Steps + currentStep);
            }
        }
    });

    // part1 answer
    // return Math.min(...intersectDistances);

    // part2 answer
    return Math.min(...steps);
}
