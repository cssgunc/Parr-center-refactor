import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Timestamp } from "firebase/firestore";

const StyledModuleLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "isComplete",
})<{ isComplete: boolean }>(({ isComplete }) => ({
  height: 10,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    backgroundColor: isComplete ? "#2563eb" : "#60a5fa",
  },
}));

export interface ModuleProgressProps {
  title: string;
  completedSteps: number;
  totalSteps: number;
  completedAt?: Timestamp | null;
  quizzesLeft?: number;
}

export default function ModuleProgress({
  title,
  completedSteps,
  totalSteps,
  completedAt,
  quizzesLeft,
}: ModuleProgressProps): JSX.Element {
  const percent = Math.round((completedSteps / totalSteps) * 100);

  const tooltipContent = `${completedSteps} of ${totalSteps} items${
    quizzesLeft !== undefined && quizzesLeft > 0
      ? ` • ${quizzesLeft} ${quizzesLeft === 1 ? "quiz" : "quizzes"} left`
      : ""
  }`;

  return (
    <Box sx={{ textAlign: "left" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="body1" component="span" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="caption" component="span" color="text.secondary">
          {percent}%
        </Typography>
      </Box>

      <Tooltip title={tooltipContent} arrow>
        <Box
          aria-label={`${title} progress: ${completedSteps} of ${totalSteps} items completed`}
        >
          <StyledModuleLinearProgress
            variant="determinate"
            value={percent}
            isComplete={percent === 100}
          />
        </Box>
      </Tooltip>

      {completedAt && (
        <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: "block" }}>
          Completed on {completedAt.toDate().toLocaleDateString()}
        </Typography>
      )}
    </Box>
  );
}

