import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

import type {
    PanelId,
    WorkspaceId,
    PanelState,
} from "../model";

export interface PanelMetadata {
    workspaceId: WorkspaceId;

    title: string;

    icon: LucideIcon;

    defaultState: PanelState;

    closable: boolean;

    pinnable: boolean;

    permission: string;
}

export interface PanelDefinition
    extends PanelMetadata {

    id: PanelId;

    component: ComponentType;
}