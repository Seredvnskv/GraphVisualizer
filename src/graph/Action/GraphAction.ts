import type {NodeId, NodeType, EdgeType, EdgeId} from "../Types/Types.ts";

export type GraphAction =
    | {type: "ADD_NODE", payload: NodeType}
    | {type: "DELETE_NODE", payload: NodeId}
    | {type: "ADD_EDGE", payload: EdgeType}
    | {type: "DELETE_EDGE", payload: EdgeId}