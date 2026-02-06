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

interface UserVote {
  userId: string;
  optionIds: string[];
  votedAt: Date;
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
        // Don't show error to user, just continue
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
    setSuccess(null);
  };

  return (
    <Box
      sx={{
        width: "80%",
        height: "90vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.grey[300]}`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 4,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          bgcolor: theme.palette.grey[50],
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <HowToVoteIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {step.title}
          </Typography>
        </Box>
        
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
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <Typography>Loading poll...</Typography>
          </Box>
        ) : (
          <>
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
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: theme.shadows[2],
                      },
                    }}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => handleOptionSelect(option.id)}
                        style={{ 
                          width: 20, 
                          height: 20,
                          cursor: 'pointer'
                        }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {option.text}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              // Single choice radio buttons
              <RadioGroup
                value={selectedOption}
                onChange={(e) => handleOptionSelect(e.target.value)}
              >
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
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: theme.shadows[2],
                      },
                    }}
                  >
                    <FormControlLabel
                      value={option.id}
                      control={<Radio />}
                      label={
                        <Typography variant="body1" fontWeight="medium">
                          {option.text}
                        </Typography>
                      }
                      sx={{ width: "100%", margin: 0 }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleVote}
              disabled={isSubmitting || (!selectedOption && selectedOptions.length === 0)}
              sx={{
                mt: 3,
                px: 4,
                py: 2,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "medium",
              }}
              startIcon={<HowToVoteIcon />}
            >
              {isSubmitting ? "Submitting..." : "Submit Vote"}
            </Button>
          </Box>
        ) : (
          /* Results View */
          <Box>
            <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
              Results ({totalVotes} total vote{totalVotes !== 1 ? 's' : ''})
            </Typography>
            
            {currentVotes.map((option) => {
              const percentage = getPercentage(option.votes);
              const isSelected = step.allowMultipleChoice 
                ? selectedOptions.includes(option.id)
                : selectedOption === option.id;
              
              return (
                <Paper
                  key={option.id}
                  sx={{
                    p: 3,
                    mb: 2,
                    borderRadius: "12px",
                    border: isSelected ? `2px solid ${theme.palette.success.main}` : `1px solid ${theme.palette.grey[300]}`,
                    bgcolor: isSelected ? theme.palette.success.light : 'white',
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {option.text}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {isSelected && (
                          <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                        )}
                        <Typography variant="body2" color="text.secondary">
                          {option.votes} votes ({percentage.toFixed(1)}%)
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: theme.palette.grey[200],
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          bgcolor: isSelected ? theme.palette.success.main : theme.palette.primary.main,
                        },
                      }}
                    />
                  </Box>
                </Paper>
              );
            })}

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
          </>
        )}
      </Box>
    </Box>
  );
}
