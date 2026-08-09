type ColorSchema = {
    fill: string;
    stroke: string;
    text: string;
}

export const VERTEX_COLORS: Record<string, ColorSchema> = {
    default: {
        fill: "fill-indigo-500",
        stroke: "stroke-indigo-500 stroke-3",
        text: "fill-indigo-900",
    },
    selected: {
        fill: "fill-amber-400",
        stroke: "stroke-amber-500 stroke-4",
        text: "fill-amber-700",
    },
    visited: {
        fill: "fill-emerald-400",
        stroke: "stroke-emerald-500 stroke-3",
        text: "fill-emerald-900",
    },
    current: {
        fill: "fill-rose-400",
        stroke: "stroke-rose-500 stroke-5",
        text: "fill-rose-900",
    },
    target: {
        fill: "fill-fuchsia-400",
        stroke: "stroke-fuchsia-500 stroke-5",
        text: "fill-fuchsia-900",
    },
}

export const EDGE_COLORS: Record<string, string> = {
    default: "stroke-indigo-900 stroke-6",
    selected: "stroke-amber-700 stroke-7",
    visited: "stroke-emerald-600 stroke-7",
}