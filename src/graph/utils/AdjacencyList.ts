import type {VertexProps} from "../component/Graph/Vertex/Vertex.tsx";
import type {EdgeProps} from "../component/Graph/Edge/Edge.tsx";

export type AdjacencyList = Map<string, Map<string, number>>;

export const createAdjacencyList = (vertices: VertexProps[], edges: EdgeProps[]): AdjacencyList => {
    const adjacencyList = new Map<string, Map<string, number>>();

    vertices.forEach(vertex => {
        adjacencyList.set(vertex.id, new Map<string, number>());
    });

    edges.forEach(edge => {
        const source = edge.source;
        const target = edge.target;
        adjacencyList.get(source.id)?.set(target.id, edge.weight);
        adjacencyList.get(target.id)?.set(source.id, edge.weight);
    });

    return adjacencyList;
}