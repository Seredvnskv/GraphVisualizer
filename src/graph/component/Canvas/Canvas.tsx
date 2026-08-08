import {useRef, type MouseEvent} from "react";
import {useGraphContext} from "../../context/GraphContext.tsx";
import {Vertex} from "../Graph/Vertex/Vertex.tsx";
import {Edge} from "../Graph/Edge/Edge.tsx";
import type {Point} from "../../utils/Constants.ts";
import {Mode} from "../../utils/Mode.ts";

export const Canvas = () => {
    const graph = useGraphContext();
    const svgRef = useRef<SVGSVGElement | null>(null);

    const convertToSVGCoordinates = (position: Point) => {
        const svg = svgRef.current;
        if (!svg) return position;

        const point = svg.createSVGPoint();
        point.x = position.x;
        point.y = position.y;

        const ctm = svg.getScreenCTM();
        if (!ctm) return position;

        const transformedPoint = point.matrixTransform(ctm.inverse());
        return {x: transformedPoint.x, y: transformedPoint.y};
    }

    const addVertexOnCanvas = (event: MouseEvent<SVGRectElement>) => {
        if (graph.currentMode() != Mode.Add) return;
        const svg = svgRef.current;
        if (!svg) return;
        graph.addVertex(convertToSVGCoordinates({x: event.clientX, y: event.clientY}));
    }

    const onVertexClick = (id: string) => {
        if (graph.currentMode() === Mode.Select) selectVertex(id);
        if (graph.currentMode() === Mode.Connect) {
            if (!graph.selectedVertex || graph.selectedVertex === id) {
                selectVertex(id);
            }
            else {
                connectVertices(graph.selectedVertex, id);
                graph.setSelectedVertex(null);
            }
        }
    }

    const selectVertex = (id: string) => {
        id === graph.selectedVertex ? graph.setSelectedVertex(null) : graph.setSelectedVertex(id);
    }

    const connectVertices = (source: string, target: string) => {
        graph.addEdge(source, target);
    }

    const drawGraph = () => {
        return (
            <>
                {graph.edges.map(edge => (
                    <Edge
                        key={edge.id}
                        id={edge.id}
                        source={edge.source}
                        target={edge.target}
                        weight={edge.weight}
                    />
                ))}

                {graph.vertices.map(vertex => (
                    <Vertex
                        key={vertex.id}
                        id={vertex.id}
                        position={vertex.position}
                        label={vertex.label}
                        onVertexClick={onVertexClick}
                        isSelected={graph.selectedVertex === vertex.id}
                        isVisited={graph.activeStep?.vertices.includes(vertex.id)}
                        isCurrent={graph.activeStep?.current === vertex.id}
                    />
                ))}
            </>
        );
    }

    return (
        <svg
            ref={svgRef}
            className="w-full h-full"
        >
            <defs>
                <pattern
                    id={"small-grid"}
                    width={20}
                    height={20}
                    patternUnits={"userSpaceOnUse"}
                >
                    <path d="M 20 0 L 0 0 0 20"
                          className={"fill-none stroke-gray-600 stroke-1"}
                    />
                </pattern>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill={"url(#small-grid)"}
                onDoubleClick={addVertexOnCanvas}
            />
            <g>
                {drawGraph()}
            </g>
        </svg>
    );
}