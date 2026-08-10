import {useGraphContext} from "../../context/GraphContext.tsx";
import {useEffect} from "react";
import type {MessagesMessage} from "primereact/messages";
import {Mode} from "../../utils/Mode.ts";

export const MessageManager = () => {
    const graph = useGraphContext();

    const showMessage = (message: MessagesMessage) => {
        graph.messageRef.current?.show(message);
    }

    useEffect(() => {
        graph.messageRef.current?.clear();
        if (graph.currentMode() === Mode.Select && graph.currentAlgorithm) {
            if (!graph.selectedVertex && !graph.isAnimationRunning && !graph.activeStep)
                showMessage(MESSAGES.START_VERTEX_NOT_SELECTED);
            if (graph.selectedVertex && graph.currentAlgorithm.path && !graph.targetVertex)
                showMessage(MESSAGES.TARGET_VERTEX_NOT_SELECTED);
        }
    }, [graph.currentAlgorithm, graph.selectedVertex, graph.targetVertex, graph.currentMode()]);

    return null;
}

const MESSAGES: Record<string, MessagesMessage> = {
    START_VERTEX_NOT_SELECTED: {
        sticky: true,
        severity: 'warn',
        summary: 'Start vertex not selected',
        detail: 'Please select a start vertex by clicking on it.',
        closable: true,
    },
    TARGET_VERTEX_NOT_SELECTED: {
        sticky: true,
        severity: 'warn',
        summary: 'Target vertex not selected',
        detail: 'Please select a target vertex by clicking on it while pressing ctrl.',
        closable: true,
    },
    NO_PATH_FOUND: {
        sticky: true,
        severity: 'error',
        summary: 'No path found',
        detail: 'There is no path between the selected start and target vertices.',
        closable: true,
    },
    PATH_FOUND: {sticky: true, severity: 'success', summary: 'Path found', detail: "", closable: true,},
}