import {Menubar} from "primereact/menubar";
import {MenuItems} from "./MenuItems.tsx";

export const ActionMenu = () => {
    return (
       <div className="w-full">
           <Menubar className="w-full space-x-1.5 rounded-2xl! px-4 py-2" model={MenuItems}/>
       </div>
    );
}