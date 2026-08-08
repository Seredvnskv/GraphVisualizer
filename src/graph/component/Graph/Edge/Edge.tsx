import {EDGE_COLORS} from "../../../utils/Colors.ts";
import type {VertexProps} from "../Vertex/Vertex.tsx";

export type EdgeProps = {
    id: string;
    source: VertexProps;
    target: VertexProps;
    weight: number;
};

export const Edge = (props: EdgeProps) => {
    const color = EDGE_COLORS["default"];

    const midX = (props.source.position.x + props.target.position.x) / 2;
    const midY = (props.source.position.y + props.target.position.y) / 2;

    return (
        <g>
            <line
                x1={props.source.position.x}
                y1={props.source.position.y}
                x2={props.target.position.x}
                y2={props.target.position.y}
                className={`${color}`}
            />
            <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
            >
                {props.weight}
            </text>
        </g>
    );
};