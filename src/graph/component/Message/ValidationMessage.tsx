import {Messages} from "primereact/messages";
import {useGraphContext} from "../../context/GraphContext.tsx";
import {useMemo} from "react";

export const ValidationMessage = () => {
    const { messageRef } = useGraphContext();

    return useMemo(() => {
        return <Messages ref={messageRef}/>;
    }, [messageRef]);
}


