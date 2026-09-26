import type {GraphState} from "../Types/Types.ts";
import type {GraphAction} from "../Action/GraphAction.ts";

export const InitialGraphState: GraphState = {
    nodes: {},
    edges: {},
    selectedNode: undefined,
    selectedEdge: undefined,
};

export const GraphReducer = (state: GraphState, action: GraphAction): GraphState => {
    switch (action.type) {
        case "ADD_NODE":
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [action.payload.id]: action.payload
                }
            };
        case "DELETE_NODE":
            const {[action.payload]: _, ...remainingNodes} = state.nodes;
            const edges = Object.fromEntries(
                Object.entries(state.edges).filter(([_, edge]) => edge.source !== action.payload && edge.target !== action.payload)
            );
            return {
                ...state,
                nodes: remainingNodes,
                edges: edges,
                selectedNode: state.selectedNode === action.payload ? undefined : state.selectedNode,
                selectedEdge: Object.values(edges).some(edge => edge.id === state.selectedEdge) ? state.selectedEdge : undefined
            };
        case "ADD_EDGE":
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [action.payload.id]: action.payload
                }
            };
        case "DELETE_EDGE":
            const {[action.payload]: __, ...remainingEdges} = state.edges;
            return {
                ...state,
                edges: remainingEdges
            };
    }
}
