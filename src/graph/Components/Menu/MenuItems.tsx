import type {MenuItem} from "primereact/menuitem";

const symbol = (name: string) => () => <span className="material-symbols-outlined me-2">{name}</span>;

export const MenuItems: MenuItem[] = [
    {
        label: "Node",
        icon: symbol("commit"),
        items: [
            {label: "Add Node", icon: symbol("add_circle"), command: () => console.log("Add Node")},
            {separator: true},
            {label: "Delete Node", icon: symbol("delete"), command: () => console.log("Delete Node")},
        ],
    },
    {
        label: "Edge",
        icon: symbol("automation"),
        items: [
            {label: "Add Edge", icon: symbol("add_circle"), command: () => console.log("Add Edge")},
            {separator: true},
            {label: "Delete Edge", icon: symbol("delete"), command: () => console.log("Delete Edge")},
        ],
    },
]