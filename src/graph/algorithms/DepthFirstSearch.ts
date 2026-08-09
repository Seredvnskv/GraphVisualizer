import type {AdjacencyList} from "../utils/AdjacencyList.ts";
import type {AlgorithmStep} from "../utils/Algorithms.ts";

export const DepthFirstSearch = (start: string, adjacencyList: AdjacencyList) => {
    const stack: string[] = [start];
    const visitedVertices: Set<string> = new Set([start]);
    const visitedEdges: Set<string> = new Set();
    const steps: AlgorithmStep[] = [];

    while (stack.length > 0) {
        const current = stack.pop()!;

        steps.push({
            current: current,
            vertices: Array.from(visitedVertices),
            edges: Array.from(visitedEdges),
        });

        const adjacentVertices = adjacencyList.get(current);
        if (adjacentVertices) {
            for (const [vertex, _] of adjacentVertices) {
                if (!visitedVertices.has(vertex)) {
                    visitedVertices.add(vertex);
                    visitedEdges.add(`${current}-${vertex}`);
                    stack.push(vertex);

                    steps.push({
                        current: current,
                        vertices: Array.from(visitedVertices),
                        edges: Array.from(visitedEdges),
                    });
                }
            }
        }
    }

    return steps;
}