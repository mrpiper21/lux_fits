"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Client-side providers. Motion honours the visitor's reduced-motion setting.
 * When the API arrives, add the TanStack Query `QueryClientProvider` here.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
