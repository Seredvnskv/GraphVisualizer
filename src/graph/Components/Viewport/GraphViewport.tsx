import {useRef} from "react";
import {useGraphContext} from "../../Context/GraphContext.tsx";
import type {NodeType} from "../../Types/Types.ts";
import {Node} from "../Node/Node.tsx";
import {RADIUS} from "../../Utils/Constants.ts";

export const GraphViewport = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const graphContext = useGraphContext();
    const nodes = Object.values(graphContext.state.nodes);

    const handleDoubleClick = (e: React.MouseEvent<SVGSVGElement>)=> {
        if (!svgRef.current) return;
        const {x, y} = toSvgCoords(svgRef.current, e.clientX, e.clientY);
        nodes.forEach((node) => {
            if (isPointInNode(x, y, node)) {
                graphContext.dispatch({type: "DELETE_NODE", payload: node.id});
            }
        });
        const node: NodeType = {id: crypto.randomUUID(), x, y, label: "x"};
        graphContext.dispatch({type: "ADD_NODE", payload: node});
    }

    return (
        <div className="flex-1 overflow-hidden border border-[#383838] rounded-2xl!">
            <svg
                ref={svgRef}
                onDoubleClick={handleDoubleClick}
                className="h-full w-full"
            >
                <rect width="100%" height="100%" fill="#1e1e1e"/>
                <g>
                    {
                        nodes.map((node) => (
                            <Node key={node.id} node={node}/>
                        ))
                    }
                </g>
            </svg>
        </div>
    );
}

const toSvgCoords = (svg: SVGSVGElement, clientX: number, clientY: number) => {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM()!.inverse());
}

const isPointInNode = (x: number, y: number, node: NodeType): boolean => {
    const dx = x - node.x;
    const dy = y - node.y;
    return dx * dx + dy * dy <= RADIUS * RADIUS;
}