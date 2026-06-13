import { useEffect } from "react";

import { bootstrapAuth, useAuth } from "@/features/auth";

import { AppRouter } from "./api/router";

export function App() {

  const { status } = useAuth();

  useEffect(() => {

    if (status === "unknown") {

      void bootstrapAuth();

    }

  }, [status]);

  return <AppRouter />;
}