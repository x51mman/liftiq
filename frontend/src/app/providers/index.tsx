import type { ReactNode } from 'react';
import { QueryProvider } from './query-provider';

type Props = {
    children: ReactNode;
};

export function AppProviders({ children }: Props) {
    return <QueryProvider>{children}</QueryProvider>;
}