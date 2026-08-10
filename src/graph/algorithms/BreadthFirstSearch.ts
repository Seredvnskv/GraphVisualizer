import type {AlgorithmStep} from "../utils/Algorithms.ts";
import type {AdjacencyList} from "../utils/AdjacencyList.ts";

export const BreadthFirstSearch = (start: string, adjacencyList: AdjacencyList) => {
    const queue: string[] = [start];
    const visitedVertices: Set<string> = new Set([start]);
    const visitedEdges: Set<string> = new Set();
    const steps: AlgorithmStep[] = [];

    while (queue.length > 0) {
        const current = queue.shift()!;

        steps.push({
            current: current,
            vertices: Array.from(visitedVertices),
            edges: Array.from(visitedEdges),
        });

        const adjacentVertices = adjacencyList.get(current);
        if (adjacentVertices) {
            for (const [vertex, _] of adjacentVertices) {
                if (!visitedVertices.has(vertex)) {
                    const [source, target] = [current, vertex].sort((a, b) => Number(a) - Number(b));
                    visitedVertices.add(vertex);
                    visitedEdges.add(`${source}-${target}`);
                    queue.push(vertex);

                    steps.push({
                        current: current,
                        vertices: Array.from(visitedVertices),
                        edges: Array.from(visitedEdges),
                    });
                }
            }
        }
    }

    steps.push({
        current: null,
        vertices: Array.from(visitedVertices),
        edges: Array.from(visitedEdges),
    });

    return steps;
}