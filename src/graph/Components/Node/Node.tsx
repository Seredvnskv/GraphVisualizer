import type {NodeType} from "../../Types/Types.ts";
import {RADIUS} from "../../Utils/Constants.ts";

export const Node = ({node}: {node: NodeType}) => {
    return (
        <g transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer select-none">
            <circle r={RADIUS} fill="#4caf50" stroke="#1e1e1e" strokeWidth={2}/>
            <text textAnchor="middle" dominantBaseline="middle">{node.label}</text>
        </g>
    );
}