import type { PanelId } from "@/app/shell/workspace/model";

export interface NavigationItem {
    id: string;
    label: string;
    panelId: PanelId;
    icon?: string;
}