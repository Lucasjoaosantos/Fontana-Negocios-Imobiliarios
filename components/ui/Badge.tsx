import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "brass" | "ink";
  className?: string;
}) {
  const tones = {
    navy: "bg-navy text-white",
    brass: "bg-brass text-white",
    ink: "bg-ink text-paper",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium tracking-wide uppercase font-mono-data",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
