"use client";

import { cn } from "@/lib/utils";

type SortOrder = "asc" | "desc" | null;

interface SortIconProps {
  isActive: boolean;
  sortOrder?: SortOrder;
  className?: string;
}

/**
 * Reusable sort icon component for table headers
 * Shows neutral icon when inactive, up/down arrow when active based on sortOrder
 */
export function SortIcon({ isActive, sortOrder = "asc", className }: SortIconProps) {
  if (!isActive) {
    return (
      <svg 
        className={cn("w-4 h-4 text-slate-300", className)} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" 
        />
      </svg>
    );
  }

  return sortOrder === "asc" ? (
    <svg 
      className={cn("w-4 h-4 text-emerald-600", className)} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M5 15l7-7 7 7" 
      />
    </svg>
  ) : (
    <svg 
      className={cn("w-4 h-4 text-emerald-600", className)} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M19 9l-7 7-7-7" 
      />
    </svg>
  );
}

export type { SortOrder };
