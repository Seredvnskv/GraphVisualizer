import type {AdjacencyList} from "../utils/AdjacencyList.ts";
import type {AlgorithmStep} from "../utils/Algorithms.ts";

export const Dijkstra = (start: string, target: string, graph: AdjacencyList) => {
    const distances: Map<string, number> = new Map();
    const previous: Map<string, string | null> = new Map();
    const queue: Set<string> = new Set<string>();
    const steps: AlgorithmStep[] = [];

    for (const vertex of graph.keys()) {
        distances.set(vertex, Infinity);
        previous.set(vertex, null);
        queue.add(vertex);
    }
    distances.set(start, 0);

    while (queue.size > 0) {
        const current = getVertexWithMinDistance(queue, distances);
        if (!current || distances.get(current) === Infinity) break;
        if (current === target) break;

        queue.delete(current);
        const adjacentVertices = graph.get(current);
        if (adjacentVertices) {
            for (const [neighbor, weight] of adjacentVertices) {
                const alt = (distances.get(current) ?? Infinity) + weight;
                if (alt < (distances.get(neighbor) ?? Infinity)) {
                    distances.set(neighbor, alt);
                    previous.set(neighbor, current);
                }
            }
        }
    }

    const path = reconstructPath(previous, target);
    for (const vertex of path) {
        steps.push({
            current: vertex,
            vertices: path.slice(0, path.indexOf(vertex) + 1),
            edges: path.slice(0, path.indexOf(vertex)).map((v, i) => `${v}-${path[i + 1]}`),
        });
    }
    return steps;
}

const getVertexWithMinDistance = (queue: Set<string>, distances: Map<string, number>) => {
    let minVertex: string | null = null;
    let minDistance = Infinity;

    for (const vertex of queue) {
        const distance = distances.get(vertex) ?? Infinity;
        if (distance < minDistance) {
            minDistance = distance;
            minVertex = vertex;
        }
    }

    return minVertex;
}

const reconstructPath = (previous: Map<string, string | null>, target: string) => {
    const path: string[] = [];
    let current: string | null = target;

    while (current) {
        path.unshift(current);
        current = previous.get(current) || null;
    }

    return path;
}