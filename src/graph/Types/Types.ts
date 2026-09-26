export type NodeId = string;
export type EdgeId = string;

export interface NodeType {
    id: NodeId;
    x: number;
    y: number;
    label: string;
}

export interface EdgeType {
    id: EdgeId;
    source: string;
    target: string;
    directed: boolean;
    weight?: number;
}

export interface GraphState {
    nodes: Record<string, NodeType>;
    edges: Record<string, EdgeType>;
    selectedNode: string | undefined;
    selectedEdge: string | undefined;
}