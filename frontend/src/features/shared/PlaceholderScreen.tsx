type Props = {
    title: string;
};

export function PlaceholderScreen({
    title,
}: Props) {
    return (
        <div className="flex h-full items-center justify-center">
            {title} coming soon...
        </div>
    );
}