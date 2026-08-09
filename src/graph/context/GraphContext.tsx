import {createContext, type ReactNode, useContext, useMemo, useRef, useState} from "react";
import type {EdgeProps} from "../component/Graph/Edge/Edge.tsx";
import type {VertexProps} from "../component/Graph/Vertex/Vertex.tsx";
import {InitialGraphState} from "../utils/InitialGraphState.ts";
import {ALGORITHM_DELAY, type Point} from "../utils/Constants.ts";
import {Mode, type ModeType} from "../utils/Mode.ts";
import {type AlgorithmStep, type AlgorithmType} from "../utils/Algorithms.ts";
import {createAdjacencyList} from "../utils/AdjacencyList.ts";

type GraphContextValue = {
    vertices: VertexProps[],
    edges: EdgeProps[],
    selectedVertex: string | null,
    setSelectedVertex: (id: string | null) => void,
    targetVertex: string | null,
    setTargetVertex: (id: string | null) => void,
    addVertex: (position: Point) => void,
    deleteVertex: (id: string) => void,
    updateVertex: (updatedVertex: VertexProps) => void,
    addEdge: (s: string, t: string) => void,
    deleteEdge: (id: string) => void,
    currentMode: () => ModeType,
    switchMode: (m: ModeType) => void,
    currentAlgorithm: AlgorithmType | null,
    setAlgorithm: (algorithm: AlgorithmType | null) => void,
    runAlgorithm: () => void,
    activeStep: AlgorithmStep | null,
    isAnimationRunning: boolean,
}

const GraphContext = createContext<GraphContextValue | null>(null);

type GraphProviderProps = {
    children: ReactNode;
}

export const GraphContextProvider = ({children}: GraphProviderProps) => {
    const [vertices, setVertices] = useState<VertexProps[]>(InitialGraphState().vertices);
    const [selectedVertex, setSelectedVertex] = useState<string | null>(null);
    const [edges, setEdges] = useState<EdgeProps[]>(InitialGraphState().edges);
    const verticesCount = useRef(vertices.length);
    const [mode, setMode] = useState<ModeType>(Mode.Select);
    const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType | null>(null);
    const adjacencyList = useMemo(() => createAdjacencyList(vertices, edges), [vertices, edges]);

    const [targetVertex, setTargetVertex] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState<AlgorithmStep | null>(null);
    const [isAnimationRunning, setIsAnimationRunning] = useState<boolean>(false);


    const setAlgorithm = (algorithm: AlgorithmType | null) => {
        setCurrentAlgorithm(algorithm);
    }

    const currentMode = () => {
        return mode;
    }

    const switchMode = (m: ModeType) => {
        if (mode === m) return;
        setMode(m);
        setSelectedVertex(null);
    }

    const addVertex = (position: Point) => {
        verticesCount.current += 1;
        setVertices(prev => [...prev, {id: `${verticesCount.current}`, position, label: `${verticesCount.current}`}]);
    }

    const updateVertex= (updatedVertex: VertexProps) => {
        setVertices(prev => prev.map(vertex => vertex.id === updatedVertex.id ? updatedVertex : vertex));
    }

    const getVertexById = (id: string) => {
        return vertices.find(vertex => vertex.id === id);
    }

    const addEdge = (s: string, t: string) => {
        const [source, target] = [s, t].sort((a, b) => Number(a) - Number(b));
        const isAlreadyConnected = edges.some(edge => edge.id === `${source}-${target}`);
        if (isAlreadyConnected) return;
        const sourceVertex = getVertexById(source);
        const targetVertex = getVertexById(target);
        if (!sourceVertex || !targetVertex) return;
        setEdges(prev => [...prev, {id: `${source}-${target}`, source: sourceVertex, target: targetVertex, weight: 1}]);
    }

    const deleteVertex = (id: string) => {
        setVertices(prev => prev.filter(vertex => vertex.id !== id));
        setEdges(prev => prev.filter(edge => edge.source.id !== id && edge.target.id !== id));
        if (selectedVertex === id) setSelectedVertex(null);
        if (targetVertex === id) setTargetVertex(null);
    }

    const deleteEdge = (id: string) => {
        setEdges(prev => prev.filter(edge => edge.id !== id));
    }

    const runAlgorithm = async () => {
        if (!currentAlgorithm || !selectedVertex || isAnimationRunning) return;

        let steps;
        if (currentAlgorithm.id === "dijkstra") {
            steps = currentAlgorithm.function(selectedVertex, targetVertex, adjacencyList);
            console.log(steps, edges);
        }
        else {
            steps = currentAlgorithm.function(selectedVertex, adjacencyList);
        }

        if (!steps || steps.length === 0) return;

        setIsAnimationRunning(true);

        try {
            for (const step of steps) {
                setActiveStep(step);
                await sleep(ALGORITHM_DELAY);
            }
        } finally {
            // setActiveStep(null);
            setIsAnimationRunning(false);
        }
    };

    const contextValue: GraphContextValue = {
        vertices,
        edges,
        selectedVertex,
        setSelectedVertex,
        targetVertex,
        setTargetVertex,
        addVertex,
        deleteVertex,
        updateVertex,
        addEdge,
        deleteEdge,
        currentMode,
        switchMode,
        currentAlgorithm,
        setAlgorithm,
        runAlgorithm,
        activeStep,
        isAnimationRunning,
    }

    return (
        <GraphContext.Provider value={contextValue}>
            {children}
        </GraphContext.Provider>
    )
}

export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) {
        throw new Error("useGraphContext must be used within a GraphContextProvider");
    }
    return context;
}

const sleep = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));