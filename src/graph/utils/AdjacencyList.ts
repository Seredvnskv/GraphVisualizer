import type {VertexProps} from "../component/Graph/Vertex/Vertex.tsx";
import type {EdgeProps} from "../component/Graph/Edge/Edge.tsx";

export type AdjacencyList = Map<string, Set<string>>;

export const createAdjacencyList = (vertices: VertexProps[], edges: EdgeProps[]): AdjacencyList => {
    const adjacencyList = new Map<string, Set<string>>();

    vertices.forEach(vertex => {
        adjacencyList.set(vertex.id, new Set());
    });

    edges.forEach(edge => {
        const source = edge.source;
        const target = edge.target;
        adjacencyList.get(source.id)?.add(target.id);
        adjacencyList.get(target.id)?.add(source.id);
    });

    return adjacencyList;
}