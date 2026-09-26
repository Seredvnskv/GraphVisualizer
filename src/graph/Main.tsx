import {ActionMenu} from "./Components/Menu/ActionMenu.tsx";
import {GraphViewport} from "./Components/Viewport/GraphViewport.tsx";

export const Main = () => {
  return (
      <div className="flex h-screen w-screen flex-col overflow-hidden p-1 gap-2">
          <ActionMenu />
          <GraphViewport />
      </div>
  )
}