import {Messages} from "primereact/messages";
import {useGraphContext} from "../../context/GraphContext.tsx";
import {useMemo} from "react";

export const ValidationMessage = () => {
    const { messageRef } = useGraphContext();

    return useMemo(() => {
        return (
            <div className="w-full h-16 absolute top-0 left-0 z-50">
                <Messages ref={messageRef}/>
            </div>
        );
    }, [messageRef]);
}


