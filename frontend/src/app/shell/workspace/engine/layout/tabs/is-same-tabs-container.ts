import type {
    PanelContainer,
} from "../../tree";

export function isSameTabsContainer(
    left: PanelContainer,
    right: PanelContainer,
): boolean {

    return (
        left.type === "tabs" &&
        right.type === "tabs" &&
        left.id === right.id
    );
}