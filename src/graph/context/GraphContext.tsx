import {createContext, type Dispatch, type ReactNode, useContext, useReducer} from "react";
import {GraphReducer, InitialGraphState} from "../State/GraphState.ts";
import type {GraphState} from "../Types/Types.ts";
import type {GraphAction} from "../Action/GraphAction.ts";

const GraphContext = createContext<{ state: GraphState; dispatch: Dispatch<GraphAction> } | undefined>(undefined);

export const GraphProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(GraphReducer, InitialGraphState);

    return (
        <GraphContext.Provider value={{state, dispatch}}>
            {children}
        </GraphContext.Provider>
    );
}

export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) {
        throw new Error("useGraphContext must be used within a GraphProvider");
    }
    return context;
}