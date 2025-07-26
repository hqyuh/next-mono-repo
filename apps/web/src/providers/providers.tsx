"use client";

import TopLoader from "@workspace/ui/components/top-loader";
import { TailwindIndicator } from "@workspace/ui/components";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <TopLoader />
      <TailwindIndicator isProduction={false} />
    </ThemeProvider>
  );
}
