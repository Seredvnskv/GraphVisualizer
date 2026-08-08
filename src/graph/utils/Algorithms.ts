import type {AdjacencyList} from "./AdjacencyList.ts";
import {BreadthFirstSearch} from "../algorithms/BreadthFirstSearch.ts";
import {DepthFirstSearch} from "../algorithms/DepthFirstSearch.ts";

export type AlgorithmType = {
    id: string;
    name: string;
    function: (start: string, graph: AdjacencyList) => AlgorithmStep[];
}

export const Algorithms: AlgorithmType[] = [
    {id: "bfs", name: "Breadth-First Search", function: BreadthFirstSearch},
    {id: "dfs", name: "Depth-First Search", function: DepthFirstSearch},
    {id: "dijkstra", name: "Dijkstra's Algorithm", function: () => []},
    {id: "a_star", name: "A* Search", function: () => []},
];

export type AlgorithmStep = {
    current: string | null;
    vertices: string[];
    edges: string[];
}