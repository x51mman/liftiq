import type {
    LayoutNode,
    TabsNode,
} from "../../model";

export function updateTabsNode(
    root: LayoutNode,
    tabsId: string,
    updater: (
        node: TabsNode,
    ) => TabsNode,
): LayoutNode {

    if (
        root.type === "tabs" &&
        root.id === tabsId
    ) {
        return updater(root);
    }

    switch (root.type) {

        case "panel":
            return root;

        case "tabs":
            return root;

        case "split":
            return {
                ...root,
                children:
                    root.children.map(
                        (child) =>
                            updateTabsNode(
                                child,
                                tabsId,
                                updater,
                            ),
                    ),
            };

        default:
            return root;
    }
}