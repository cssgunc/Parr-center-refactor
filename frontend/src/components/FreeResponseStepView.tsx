"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { FreeResponseStep } from "@/lib/firebase/types";
import { saveFreeResponseToJournal } from "@/lib/firebase/db-operations";

interface FreeResponseProps {
  step: FreeResponseStep;
  userId: string;
  moduleId: string;
  moduleTitle: string;
}

/**
 * JournalEntry Component
 *
 * Displays a free response journal entry form matching the design specification.
 * Allows users to write and save journal entries for module reflection.
 */
export default function FreeResponseStepView({
  step,
  userId,
  moduleId,
  moduleTitle,
}: FreeResponseProps) {
  const theme = useTheme();
  const [response, setResponse] = useState<string>("");

  const handleSave = async () => {
    await saveFreeResponseToJournal(
      userId,
      moduleId,
      moduleTitle,
      step.prompt,
      response
    );
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
        {/* Section Title - Centered, Serif Font */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: "var(--font-secondary)",
            color: theme.palette.common.black,
            textAlign: "center",
            mb: 4,
          }}
        >
          Part 1: Immediate Engagement
        </Typography>

        {/* Journal Entry Title */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: "var(--font-primary)",
            color: theme.palette.common.black,
            mb: 3,
            textAlign: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          Post-Reflection Journal Entry
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
            aria-label="Save journal entry"
          >
            Save
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
    </Box>
  );
}
