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

// part1
export function getAnswer() {
    const graph: { [x: number]: { [y: number]: true } } = {};
    let currentCoordinates: Coordinates = { x: 0, y: 0 };

    input.wire1.forEach(instruction => {
        const dir = getDirection(instruction);
        const length = getInstructionLength(instruction);

        for (let i = 1; i <= length; i++) {
            currentCoordinates = getNextCoordinates(currentCoordinates, dir);
            graph[currentCoordinates.x] = { ...graph[currentCoordinates.x], [currentCoordinates.y]: true };
        }
    });

    currentCoordinates = { x: 0, y: 0 };
    const intersectDistances: number[] = [];
    input.wire2.forEach(instruction => {
        const dir = getDirection(instruction);
        const length = getInstructionLength(instruction);

        for (let i = 1; i <= length; i++) {
            currentCoordinates = getNextCoordinates(currentCoordinates, dir);
            if (graph[currentCoordinates.x]?.[currentCoordinates.y] ?? false) {
                intersectDistances.push(Math.abs(currentCoordinates.x) + Math.abs(currentCoordinates.y));
            }
        }
    });


    return Math.min(...intersectDistances);
}

// part2
