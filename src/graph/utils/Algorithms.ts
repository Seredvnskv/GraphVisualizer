import {BreadthFirstSearch} from "../algorithms/BreadthFirstSearch.ts";
import {DepthFirstSearch} from "../algorithms/DepthFirstSearch.ts";
import {Dijkstra} from "../algorithms/Dijkstra.ts";

export type AlgorithmType = {
    id: string;
    name: string;
    function: (...args: any[]) => AlgorithmStep[];
    path?: boolean;
}

export const Algorithms: AlgorithmType[] = [
    {id: "bfs", name: "Breadth-First Search", function: BreadthFirstSearch},
    {id: "dfs", name: "Depth-First Search", function: DepthFirstSearch},
    {id: "dijkstra", name: "Dijkstra's Algorithm", function: Dijkstra, path: true},
    {id: "a_star", name: "A* Search", function: () => [], path: true},
];

export type AlgorithmStep = {
    current: string | null;
    vertices: string[];
    edges: string[];
}