
// This file is obsolete and no longer used.
// The application has been converted to a General Knowledge Quiz, which does not use this progress tracker.
// This file can be safely deleted.

"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  value: number; // 0-100
  totalSteps: number;
  currentStepNumber: number; // 1-based index for display
}

export function ProgressTracker({ value, totalSteps, currentStepNumber }: ProgressTrackerProps) {
  if (totalSteps === 0) return null;

  return (
    <div className="w-full my-6 px-2">
      <Progress value={value} className="w-full h-2.5 rounded-full shadow-sm" />
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Question {Math.min(currentStepNumber, totalSteps)} of {totalSteps}
      </p>
    </div>
  );
}
