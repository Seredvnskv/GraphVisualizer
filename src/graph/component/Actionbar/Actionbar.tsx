import {Dropdown} from "primereact/dropdown";
import {ToggleButton} from "primereact/togglebutton";
import {useGraphContext} from "../../context/GraphContext.tsx";
import {Mode, type ModeType} from "../../utils/Mode.ts";
import {Algorithms} from "../../utils/Algorithms.ts";
import {Button} from "primereact/button";

export const Actionbar = () => {
    const graph = useGraphContext();

    const toggleMode = (mode: ModeType) => {
        const nextMode = graph.currentMode() === mode ? Mode.Select : mode;
        graph.switchMode(nextMode);
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-64 h-full p-2 justify-center align-middle">
                <ToggleButton
                    onLabel={"Add Vertex"}
                    offLabel={"Add Vertex"}
                    onIcon="pi pi-plus"
                    offIcon="pi pi-plus"
                    checked={graph.currentMode() === Mode.Add}
                    onChange={() => toggleMode(Mode.Add)}
                />
                <ToggleButton
                    onLabel={"Connect Vertices"}
                    offLabel={"Connect Vertices"}
                    onIcon="pi pi-share-alt"
                    offIcon="pi pi-share-alt"
                    checked={graph.currentMode() === Mode.Connect}
                    onChange={() =>toggleMode(Mode.Connect)}
                />
                <ToggleButton
                    onLabel={"Delete"}
                    offLabel={"Delete"}
                    onIcon="pi pi-trash"
                    offIcon="pi pi-trash"
                    checked={graph.currentMode() === Mode.Delete}
                    onChange={() => toggleMode(Mode.Delete)}
                />
                <Dropdown
                    value={graph.currentAlgorithm}
                    options={Algorithms}
                    onChange={(e) => graph.setAlgorithm(e.value)}
                    optionLabel="name"
                    placeholder="Select an algorithm"
                    disabled={graph.currentMode() !== Mode.Select}
                    showClear
                />
                {graph.currentAlgorithm && graph.currentMode() === Mode.Select && !graph.selectedVertex && (
                    <span className="text-sm text-center text-gray-300">
                        Please select a start node on the graph to run the algorithm.
                    </span>
                )}
                {graph.currentAlgorithm && graph.currentMode() === Mode.Select && graph.selectedVertex && (
                    <Button
                        label="Run Algorithm"
                        onClick={() => graph.runAlgorithm()}
                        disabled={graph.isAnimationRunning}
                    />
                )}
            </div>
        </>
    );
}