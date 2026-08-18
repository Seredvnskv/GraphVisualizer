import type {MessagesMessage} from "primereact/messages";
import {Mode, type ModeType} from "../../utils/Mode";
import type {AlgorithmStep, AlgorithmType} from "../../utils/Algorithms.ts";

export const MESSAGES: Record<string, MessagesMessage> = {
    START_VERTEX_NOT_SELECTED: {
        sticky: true,
        severity: "warn",
        summary: "Start vertex not selected",
        detail: "Please select a start vertex by clicking on it.",
        closable: true,
    },
    TARGET_VERTEX_NOT_SELECTED: {
        sticky: true,
        severity: "warn",
        summary: "Target vertex not selected",
        detail: "Please select a target vertex by clicking on it while pressing ctrl.",
        closable: true,
    },
    NO_PATH_FOUND: {
        sticky: true,
        severity: "error",
        summary: "No path found",
        detail: "There is no path between the selected start and target vertices.",
        closable: true,
    },
    PATH_FOUND: {
        sticky: true,
        severity: "success",
        summary: "Path found",
        detail: "",
        closable: true,
    },
};

export const validationMessage = (
    state: {
        currentMode: () => ModeType;
        currentAlgorithm: AlgorithmType | null;
        selectedVertex: string | null;
        targetVertex: string | null;
        isAnimationRunning: boolean;
        activeStep: AlgorithmStep | null
    }
): MessagesMessage | null => {
    if (state.currentMode() !== Mode.Select || !state.currentAlgorithm) {
        return null;
    }

    if (!state.selectedVertex && !state.isAnimationRunning && !state.activeStep) {
        return MESSAGES.START_VERTEX_NOT_SELECTED;
    }

    if (state.selectedVertex && state.currentAlgorithm.path && !state.targetVertex) {
        return MESSAGES.TARGET_VERTEX_NOT_SELECTED;
    }

    return null;
};