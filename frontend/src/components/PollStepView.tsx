"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  useTheme,
  Alert,
  Chip,
  Checkbox,
} from "@mui/material";
import { PollStep, PollOption } from "@/lib/firebase/types";
import { submitPollVote, getUserPollVote } from "@/lib/firebase/db-operations";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PollStepViewProps {
  step: PollStep;
  stepId: string;
  userId: string;
  moduleId: string;
}

export default function PollStepView({ step, stepId, userId, moduleId }: PollStepViewProps) {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentVotes, setCurrentVotes] = useState<PollOption[]>(step.options);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("PollStepView rendered with step:", step);

  // Check if user has already voted
  useEffect(() => {
    const checkUserVote = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const userVote = await getUserPollVote(moduleId, stepId, userId);
        if (userVote) {
          setHasVoted(true);
          setShowResults(true);
          if (step.allowMultipleChoice) {
            setSelectedOptions(userVote.optionIds);
          } else {
            setSelectedOption(userVote.optionIds[0] || "");
          }
        }
      } catch (err) {
        console.error("Error checking user vote:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserVote();
  }, [userId, moduleId, stepId, step.allowMultipleChoice]);

  // Calculate total votes and percentages
  const totalVotes = currentVotes.reduce((sum, option) => sum + option.votes, 0);
  const getPercentage = (votes: number) => (totalVotes > 0 ? (votes / totalVotes) * 100 : 0);

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return;
    
    if (step.allowMultipleChoice) {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOption(optionId);
    }
  };

  // Handle vote submission
  const handleVote = async () => {
    if (!userId) {
      setError("You must be logged in to vote");
      return;
    }

    const selectedIds = step.allowMultipleChoice ? selectedOptions : [selectedOption];
    
    if (selectedIds.length === 0) {
      setError("Please select at least one option");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitPollVote(moduleId, stepId, userId, selectedIds);
      
      // Update local state with new vote counts
      const updatedVotes = currentVotes.map(option => {
        if (selectedIds.includes(option.id)) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });

      setCurrentVotes(updatedVotes);
      setHasVoted(true);
      setShowResults(true);
      setSuccess("Your vote has been recorded!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (err: any) {
      setError(err.message || "Failed to submit vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setSelectedOption("");
    setSelectedOptions([]);
    setHasVoted(false);
    setShowResults(false);
    setError(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography>Loading poll...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          Poll: {step.title || "Untitled Poll"}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Ethical Dilemma
        </Typography>
        
        {step.allowMultipleChoice && (
          <Chip 
            label="Multiple Choice Allowed" 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: 4, overflow: "auto" }}>
        {/* Question */}
        <Typography variant="h5" fontWeight="medium" sx={{ mb: 4 }}>
          {step.question}
        </Typography>

        {/* Error/Success Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            icon={<CheckCircleIcon />}
          >
            {success}
          </Alert>
        )}

        {/* Voting Options */}
        {!hasVoted ? (
          <Box>
            {step.allowMultipleChoice ? (
              // Multiple choice checkboxes
              <Box>
                {currentVotes.map((option) => (
                  <Paper
                    key={option.id}
                    sx={{
                      p: 3,
                      mb: 2,
                      border: `2px solid ${
                        selectedOptions.includes(option.id)
                          ? theme.palette.primary.main
                          : theme.palette.grey[300]
                      }`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionSelect(option.id)}
                          color="primary"
                        />
                      }
                      label={option.text}
                      sx={{ m: 0 }}
                    />
                  </Paper>
                ))}
              </Box>
            ) : (
              // Single choice radio buttons
              <Box>
                {currentVotes.map((option) => (
                  <Paper
                    key={option.id}
                    sx={{
                      p: 3,
                      mb: 2,
                      border: `2px solid ${
                        selectedOption === option.id
                          ? theme.palette.primary.main
                          : theme.palette.grey[300]
                      }`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedOption === option.id}
                          onChange={() => handleOptionSelect(option.id)}
                          color="primary"
                        />
                      }
                      label={option.text}
                      sx={{ m: 0 }}
                    />
                  </Paper>
                ))}
              </Box>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleVote}
              disabled={isSubmitting}
              sx={{
                mt: 3,
                px: 4,
                py: 2,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "medium",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Vote"}
            </Button>
          </Box>
        ) : (
          // Results view
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Results
            </Typography>
            {currentVotes.map((option) => {
              const percentage = getPercentage(option.votes);
              return (
                <Box key={option.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {option.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.votes} votes ({percentage.toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              );
            })}
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Total votes: {totalVotes}
            </Typography>

            {/* Reset Button */}
            <Button
              variant="outlined"
              size="large"
              onClick={handleReset}
              sx={{
                mt: 3,
                px: 4,
                py: 2,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "medium",
              }}
            >
              Vote Again
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
