import type { ReactNode } from "react";

type Props = {

    children: ReactNode;

};

export function Container({

    children,

}: Props) {

    return (

        <div
            className="
                w-full

                max-w-7xl

                mx-auto

                px-6
            "
        >

            {children}

        </div>

    );

}