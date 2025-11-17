"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FreeResponseStep } from "@/lib/firebase/types";

interface FreeResponseProps {
  step: FreeResponseStep;
  onBack?: () => void;
}

/**
 * JournalEntry Component
 *
 * Displays a free response journal entry form matching the design specification.
 * Allows users to write and save journal entries for module reflection.
 */
export default function FreeResponseStepView({
  step,
  onBack,
}: FreeResponseProps) {
  const theme = useTheme();
  const [response, setResponse] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    // Temporary UI-only save flow. Replace with real DB call later.
    setSaveError(null);
    setIsSaving(true);
    try {
      // Simulate async save so users see spinner + success snackbar
      await new Promise((res) => setTimeout(res, 700));

      // On success, show confirmation
      setSaveSuccess(true);
      console.log("Save simulated: success");
    } catch (err) {
      console.error("Save simulated: error", err);
      setSaveError("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      {/* Back Arrow Button - Top Left
      <Box sx={{ p: 2, display: "flex", alignItems: "flex-start" }}>
        <IconButton
          onClick={handleBack}
          sx={{
            color: theme.palette.common.black,
            "&:hover": {
              bgcolor: theme.palette.grey[100],
            },
          }}
          aria-label="Go back"
        >
          <ArrowBackIcon />
        </IconButton>
      </Box> */}

      {/* Main Content Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: "8vw",
          pb: 12,
          flex: 1,
          position: "relative",
        }}
      >


        {/* Journal Entry Title */}
        <Typography
          variant="h2"
          sx={{
            fontSize: "2.0 rem",
            fontWeight: "bold",
            fontFamily: "var(--font-primary)",
            color: theme.palette.common.black,
            mb: 3,
            textAlign: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {step.title}
        </Typography>

        {/* Prompt Text */}
        <Typography
          sx={{
            fontSize: "1rem",
            color: theme.palette.common.black,
            mb: 3,
            textAlign: "left",
            width: "100%",
            maxWidth: "1200px",
            lineHeight: 1.6,
          }}
        >
          {step.prompt}
        </Typography>

        {/* Text Input Area */}
        <TextField
          multiline
          rows={12}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your answer here...."
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              bgcolor: "background.paper",
              "& fieldset": {
                borderColor: theme.palette.grey[300],
              },
              "&:hover fieldset": {
                borderColor: theme.palette.grey[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: "#003366",
                borderWidth: 2,
              },
            },
          }}
          slotProps={{
            htmlInput: {
              maxLength: step.maxLength,
              "aria-label": "Journal entry response",
            },
          }}
        />

        {/* Estimated Time Subtext */}
        {step.estimatedMinutes && (
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: theme.palette.text.secondary,
              mb: 3,
              textAlign: "left",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            This free response should take {step.estimatedMinutes} minutes.
          </Typography>
        )}

        {/* Buttons Container - Save and Continue */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            mb: 4,
          }}
        >
          {/* Save Button */}
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isSaving}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "8px",
              bgcolor: "#003366",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#002244",
              },
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
            }}
            aria-label={isSaving ? "Saving journal entry" : "Save journal entry"}
          >
            {isSaving ? (
              <>
                <CircularProgress size={18} color="inherit" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>

          {/* Continue Button - Right Aligned
          <Button
            onClick={handleContinue}
            variant="contained"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "8px",
              bgcolor: "#003366",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#002244",
              },
            }}
            aria-label="Continue to next step"
          >
            Continue
          </Button> */}
        </Box>
      </Box>
      {/* Success / Error Snackbars */}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSaveSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Saved
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!saveError}
        autoHideDuration={4000}
        onClose={() => setSaveError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSaveError(null)} severity="error" sx={{ width: "100%" }}>
          {saveError}
        </Alert>
      </Snackbar>
    </Box>
  );
}
