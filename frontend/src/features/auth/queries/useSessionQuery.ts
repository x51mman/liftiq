import { useQuery } from "@tanstack/react-query";

import { authKeys } from "@/shared/api";

import { getSession } from "../api";

export function useSessionQuery() {

    return useQuery({

        queryKey: authKeys.session(),

        queryFn: getSession,

        staleTime: 60_000,

    });
}