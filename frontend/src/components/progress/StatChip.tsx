import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

export interface StatChipProps {
  label: string;
  value: string | number;
  tooltip?: string;
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export default function StatChip({
  label,
  value,
  tooltip,
  color = "default",
}: StatChipProps): JSX.Element {
  const chip = (
    <Chip
      label={`${label}: ${value}`}
      color={color}
      variant="outlined"
      sx={{ fontWeight: 500 }}
    />
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        <Box component="span" sx={{ display: "inline-block" }}>
          {chip}
        </Box>
      </Tooltip>
    );
  }

  return chip;
}

