import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Timestamp } from "firebase/firestore";
import { UserProgress } from "../../lib/firebase/types";
import ModuleProgress from "./ModuleProgress";

export interface ModuleItem {
  id: string;
  title: string;
  stepCount: number;
}

export interface ModuleProgressListProps {
  modules: ModuleItem[];
  progressData: Record<string, UserProgress>;
  quizzesLeftCalculator?: (moduleId: string, completedSteps: number, totalSteps: number) => number;
}

export default function ModuleProgressList({
  modules,
  progressData,
  quizzesLeftCalculator,
}: ModuleProgressListProps): JSX.Element {
  if (modules.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No modules started yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {modules.map((mod) => {
        const progress = progressData[mod.id];
        const completedSteps = progress?.completedStepIds.length || 0;
        const totalSteps = mod.stepCount || 1;

        const quizzesLeft =
          quizzesLeftCalculator
            ? quizzesLeftCalculator(mod.id, completedSteps, totalSteps)
            : Math.max(0, totalSteps - completedSteps);

        // Convert Date to Timestamp if needed
        let completedAt: Timestamp | null = null;
        if (progress?.completedAt) {
          if (progress.completedAt instanceof Date) {
            completedAt = Timestamp.fromDate(progress.completedAt);
          } else {
            completedAt = progress.completedAt;
          }
        }

        return (
          <ModuleProgress
            key={mod.id}
            title={mod.title}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            completedAt={completedAt}
            quizzesLeft={quizzesLeft}
          />
        );
      })}
    </Box>
  );
}

