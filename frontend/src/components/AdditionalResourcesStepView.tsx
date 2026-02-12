import { Box, Typography, Button, Link } from "@mui/material";
import { AdditionalResourcesStep } from "@/lib/firebase/types";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';

interface AdditionalResourcesStepProps {
  step: AdditionalResourcesStep;
}

export default function AdditionalResourcesStepView({ step }: AdditionalResourcesStepProps) {
  const { title, resources } = step;
  const hasLink = resources?.link && resources.link.trim() !== '';
  const hasPdf = resources?.pdf && resources.pdf.trim() !== '';

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        p: 4,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
        }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          color: "text.secondary",
        }}
      >
        Additional Learning Resources
      </Typography>

      {/* Resources Container */}
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          width: "100%",
        }}
      >
        {/* No resources message */}
        {!hasLink && !hasPdf && (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              px: 4,
              backgroundColor: "grey.50",
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "grey.300",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No additional resources available for this step.
            </Typography>
          </Box>
        )}

        {/* Resources List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* External Link */}
          {hasLink && (
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <LinkIcon sx={{ color: "primary.main", fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  External Resource
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2 }}
              >
                Click below to view this resource in a new tab
              </Typography>

              <Button
                variant="contained"
                href={resources.link}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                }}
              >
                Open Resource
              </Button>
            </Box>
          )}

          {/* PDF Link */}
          {hasPdf && (
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <InsertDriveFileIcon sx={{ color: "error.main", fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  PDF Document
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2 }}
              >
                View or download this PDF document in a new tab
              </Typography>

              <Button
                variant="contained"
                color="error"
                href={resources.pdf}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                }}
              >
                View PDF
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
