import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#2563eb",
  },
}));

export interface OverallProgressBarProps {
  value: number; // 0–100
  label?: string; // e.g., "Overall Progress"
  tooltip?: string; // optional tooltip content
  totalCompleted?: number;
  totalSteps?: number;
  completedModulesCount?: number;
  totalModulesCount?: number;
}

export default function OverallProgressBar({
  value,
  label = "Overall Progress",
  tooltip,
  totalCompleted,
  totalSteps,
  completedModulesCount,
  totalModulesCount,
}: OverallProgressBarProps): JSX.Element {
  const progressBar = (
    <Box
      sx={{
        bgcolor: "grey.50",
        border: 1,
        borderColor: "grey.200",
        borderRadius: 3,
        p: 3,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body1" component="span" sx={{ fontWeight: 500 }}>
          {value}%
        </Typography>
      </Box>
      <StyledLinearProgress
        variant="determinate"
        value={value}
        aria-label={`${label}: ${value}%`}
      />
      {totalCompleted !== undefined &&
        totalSteps !== undefined &&
        completedModulesCount !== undefined &&
        totalModulesCount !== undefined && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            {totalCompleted} of {totalSteps} items completed •{" "}
            {completedModulesCount}/{totalModulesCount} modules
          </Typography>
        )}
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        {progressBar}
      </Tooltip>
    );
  }

  return progressBar;
}

