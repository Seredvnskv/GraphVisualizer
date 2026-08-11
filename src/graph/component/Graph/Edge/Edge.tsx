import {EDGE_COLORS} from "../../../utils/Colors.ts";
import type {VertexProps} from "../Vertex/Vertex.tsx";

export type EdgeProps = {
    id: string;
    source: VertexProps;
    target: VertexProps;
    weight: number;
    isSelected?: boolean;
    isVisited?: boolean;
    onEdgeClick?: (id: string, event: React.MouseEvent) => void;
};

export const Edge = (props: EdgeProps) => {
    let color = EDGE_COLORS.default;
    if (props.isVisited) {
        color = EDGE_COLORS.visited;
    }
    if (props.isSelected) {
        color = EDGE_COLORS.selected;
    }

    const x = (props.source.position.x + props.target.position.x) / 2;
    const y = (props.source.position.y + props.target.position.y) / 2;

    return (
        <g className="select-none" onClick={(event) => props.onEdgeClick?.(props.id, event)}>
            <line
                x1={props.source.position.x}
                y1={props.source.position.y}
                x2={props.target.position.x}
                y2={props.target.position.y}
                className={`${color} transition-all duration-300`}
            />
            <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-lg font-bold ${color} [paint-order:stroke] transition-all duration-300`}
            >
                {props.weight}
            </text>
        </g>
    );
};