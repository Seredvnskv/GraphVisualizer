import type {VertexProps} from "../component/Graph/Vertex/Vertex.tsx";
import type {EdgeProps} from "../component/Graph/Edge/Edge.tsx";

export const InitialGraphState = () => {
    const vertices: VertexProps[] = [
        {id: "1", position: {x: 1000, y: 130}, label: "1"},
        {id: "2", position: {x: 1300, y: 500}, label: "2"},
        {id: "3", position: {x: 1000, y: 800}, label: "3"},
        {id: "4", position: {x: 1600, y: 600}, label: "4"},
    ];

    const edges: EdgeProps[] = [
        {id: "1-2", source: vertices[0], target: vertices[1], weight: 2},
        {id: "2-3", source: vertices[1], target: vertices[2], weight: 3},
        {id: "3-4", source: vertices[2], target: vertices[3], weight: 1},
    ];

    return {vertices, edges};
}