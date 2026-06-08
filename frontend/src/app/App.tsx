import { useEffect } from "react";

import {
  bootstrapAuth,
  useAuth,
} from "@/features/auth";

import { AppRouter } from "./router";

export function App() {

  const { status } = useAuth();

  useEffect(() => {

    if (status === "unknown") {

      void bootstrapAuth();

    }

  }, [status]);

  return <AppRouter />;
}