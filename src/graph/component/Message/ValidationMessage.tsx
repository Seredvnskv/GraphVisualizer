import { useEffect, useRef } from "react";
import { Messages } from "primereact/messages";
import { useGraphContext } from "../../context/GraphContext";
import {validationMessage} from "./Messages.ts";

export const ValidationMessage = () => {
    const messagesRef = useRef<Messages>(null);
    const {
        currentMode,
        currentAlgorithm,
        selectedVertex,
        targetVertex,
        isAnimationRunning,
        activeStep,
    } = useGraphContext();

    const activeMessage = validationMessage({
        currentMode,
        currentAlgorithm,
        selectedVertex,
        targetVertex,
        isAnimationRunning,
        activeStep,
    });

    useEffect(() => {
        messagesRef.current?.clear();
        if (activeMessage) {
            messagesRef.current?.show(activeMessage);
        }
    }, [activeMessage]);

    return (
        <div className="w-full h-16 absolute top-10/11 z-50 p-5">
            <Messages ref={messagesRef} />
        </div>
    );
};