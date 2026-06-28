//import type { LayoutNode } from "./panel-layout.types";

export const defaultLayout = {
    type: "split",
    id: "root-split",
    direction: "horizontal",
    ratio: [70, 30],
    children: [
        {
            type: "panel",
            id: "dashboard-root",
            panelId: "dashboard-main",
        },
        {
            type: "panel",
            id: "monitoring-root",
            panelId: "monitoring-main",
        },
    ],
} as const;