import {DEFAULT_VERTEX_RADIUS as radius, type Point, EMPTY_STRING} from "../../../utils/Constants.ts";
import {VERTEX_COLORS} from "../../../utils/Colors.ts";
export type VertexProps = {
    id: string;
    position: Point;
    label?: string;
    onVertexClick?: (id: string, event: React.MouseEvent) => void;
    isSelected?: boolean;
    isCurrent?: boolean;
    isVisited?: boolean;
    isTarget?: boolean;
}

export const Vertex = (props: VertexProps) => {
    const label = props.label || EMPTY_STRING;
    let color = VERTEX_COLORS.default;
    if (props.isVisited) {
        color = VERTEX_COLORS.visited;
    }
    if (props.isSelected) {
        color = VERTEX_COLORS.selected;
    }
    if (props.isCurrent) {
        color = VERTEX_COLORS.current;
    }
    if (props.isTarget) {
        color = VERTEX_COLORS.target;
    }

    return (
        <g
            className="cursor-grab select-none"
            transform={`translate(${props.position.x}, ${props.position.y})`}
            onClick={(event) => props.onVertexClick?.(props.id, event)}
        >
            <circle
                r={radius}
                className={`
                    ${color.fill}
                    ${color.stroke}
                    transition-all
                    duration-300
                `}
            />

            <text
                className={`text-lg font-bold ${color.text}`}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {label}
            </text>
        </g>
    );
};