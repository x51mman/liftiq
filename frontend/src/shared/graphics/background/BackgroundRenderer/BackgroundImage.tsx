type Props = {
    src?: string;
};

export function BackgroundImage({
    src = "/backgrounds/login-bg.jpg",
}: Props) {
    return (
        <div
            className="
                absolute
                inset-0

                bg-cover
                bg-center
            "
            style={{
                backgroundImage: `url(${src})`,
            }}
        />
    );
}