import {Splitter, SplitterPanel} from "primereact/splitter";
import {Canvas} from "./Canvas/Canvas.tsx";
import {Actionbar} from "./Actionbar/Actionbar.tsx";
import {GraphContextProvider} from "../context/GraphContext.tsx";

export function Main() {
  return (
      <GraphContextProvider>
          <Splitter className="w-screen h-screen" layout={"horizontal"}>
              <SplitterPanel size={5} minSize={5}>
                  <Actionbar />
              </SplitterPanel>
              <SplitterPanel size={95} minSize={95}>
                  <Canvas />
              </SplitterPanel>
          </Splitter>
      </GraphContextProvider>
  )
}