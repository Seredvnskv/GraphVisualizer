import {Button} from "primereact/button";
import {useGraphContext} from "../../../../context/GraphContext.tsx";
import {Dialog} from "primereact/dialog";
import {useEffect, useState} from "react";

export const EditEdgeDialog = () => {
    const graph = useGraphContext();
    const [weight, setWeight] = useState<number>(0);

    useEffect(() => {
        setWeight(graph.edges.find(edge => edge.id === graph.selectedEdge)?.weight || 0);
    }, [graph.selectedEdge, graph.editEdge]);

    const save = () => {
        graph.updateEdge(weight);
        graph.setEditEdge(false);
    };

    const close = () => {
        graph.setEditEdge(false);
    };

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={close} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={save} autoFocus />
        </div>
    );

    return (
        <div className="">
            <Dialog
                header="Edit Edge"
                visible={graph.editEdge}
                style={{ width: '30vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                footer={footerContent}
                onHide={close}
            >
                <div className="flex flex-col gap-2 pt-2">
                    <label htmlFor="weight" className="font-bold">Weight</label>
                    <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="p-2 border rounded"
                    />
                </div>
            </Dialog>
        </div>
    );
}