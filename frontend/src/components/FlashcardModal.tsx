'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { flashcardsByModule } from '@/data/mockFlashcards';
import modulesContent from '@/data/modulesContent';

interface FlashcardModalProps {
  open: boolean;
  onClose: () => void;
  moduleId: number;
}

export default function FlashcardModal({ open, onClose, moduleId }: FlashcardModalProps) {
  const theme = useTheme();
  
  // State management
  const [mode, setMode] = useState<'flashcards' | 'test'>('flashcards');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerChoices, setAnswerChoices] = useState<Array<{label: string, definition: string, isCorrect: boolean}>>([]);
  
  // Get flashcards for the current module
  const moduleFlashcards = flashcardsByModule[moduleId] || {};
  
  // Convert the object structure to an array for easier rendering
  const flashcardsArray = useMemo(() => {
    return Object.entries(moduleFlashcards).map(([cardKey, cardData]) => ({
      id: cardKey,
      term: cardData[0],
      definition: cardData[1],
    }));
  }, [moduleFlashcards]);

  // Get module title for the header
  const moduleTitle = modulesContent[moduleId]?.title || `Module ${moduleId}`;

  // Generate answer choices for current question
  useEffect(() => {
    if (mode === 'test' && flashcardsArray.length > 0 && currentQuestionIndex < flashcardsArray.length) {
      const currentFlashcard = flashcardsArray[currentQuestionIndex];
      const correctDefinition = currentFlashcard.definition;
      
      // Get all definitions except the current one
      let otherDefinitions = flashcardsArray
        .filter((_, index) => index !== currentQuestionIndex)
        .map(f => f.definition);
      
      // If we don't have enough other definitions, duplicate some to ensure we have at least 3 incorrect choices
      while (otherDefinitions.length < 3) {
        if (otherDefinitions.length === 0) {
          // If no other flashcards exist, use placeholder text
          otherDefinitions = ['Option B', 'Option C', 'Option D'];
          break;
        }
        // Duplicate definitions to fill up to 3
        otherDefinitions = [...otherDefinitions, ...otherDefinitions].slice(0, 3);
      }
      
      // Randomly select 3 incorrect definitions
      const shuffledOthers = [...otherDefinitions].sort(() => Math.random() - 0.5);
      const incorrectChoices = shuffledOthers.slice(0, 3);
      
      // Create 4 choices (1 correct + 3 incorrect)
      const choices = [
        { label: 'A', definition: correctDefinition, isCorrect: true },
        { label: 'B', definition: incorrectChoices[0] || 'Option B', isCorrect: false },
        { label: 'C', definition: incorrectChoices[1] || 'Option C', isCorrect: false },
        { label: 'D', definition: incorrectChoices[2] || 'Option D', isCorrect: false },
      ];
      
      // Shuffle the choices
      const shuffledChoices = choices.sort(() => Math.random() - 0.5);
      // Reassign labels after shuffling
      shuffledChoices.forEach((choice, index) => {
        choice.label = ['A', 'B', 'C', 'D'][index];
      });
      
      setAnswerChoices(shuffledChoices);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [mode, currentQuestionIndex, flashcardsArray]);

  // Reset state when switching modes
  useEffect(() => {
    if (mode === 'test') {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [mode]);

  // Handle answer selection
  const handleAnswerClick = (index: number) => {
    if (showFeedback) return; // Prevent multiple clicks
    
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  // Handle skip
  const handleSkip = () => {
    const nextIndex = (currentQuestionIndex + 1) % flashcardsArray.length;
    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // Get current question for test mode
  const currentQuestion = flashcardsArray[currentQuestionIndex] || null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            maxWidth: '1200px',
            maxHeight: '90vh',
            m: 2,
          },
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header with back arrow and title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              mr: 2,
              color: theme.palette.common.black,
              '&:hover': {
                bgcolor: theme.palette.grey[100],
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              flex: 1,
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-primary)',
              color: theme.palette.common.black,
            }}
          >
            {mode === 'test' ? 'Test: Key Ethical Concepts' : 'Flashcard Deck: Key Ethical Concepts'}
          </Typography>
        </Box>

        {/* Flashcards and Test buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 3,
            pt: 2,
            pb: 1,
          }}
        >
          <Button
            onClick={() => setMode('flashcards')}
            variant={mode === 'flashcards' ? 'contained' : 'outlined'}
            sx={{
              borderRadius: '16px',
              bgcolor: mode === 'flashcards' ? theme.palette.common.black : 'transparent',
              color: mode === 'flashcards' ? 'white' : theme.palette.common.black,
              borderColor: theme.palette.common.black,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: mode === 'flashcards' ? theme.palette.common.black : theme.palette.common.black,
                color: 'white',
                borderColor: theme.palette.common.black,
              },
            }}
          >
            Flashcards
          </Button>
          <Button
            onClick={() => setMode('test')}
            variant={mode === 'test' ? 'contained' : 'outlined'}
            sx={{
              borderRadius: '16px',
              bgcolor: mode === 'test' ? theme.palette.common.black : 'transparent',
              color: mode === 'test' ? 'white' : theme.palette.common.black,
              borderColor: theme.palette.common.black,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: mode === 'test' ? theme.palette.common.black : theme.palette.common.black,
                color: 'white',
                borderColor: theme.palette.common.black,
              },
            }}
          >
            Test
          </Button>
        </Box>

        {/* Content area - conditional rendering based on mode */}
        {mode === 'flashcards' ? (
          <>
            {/* Flashcards section heading */}
            <Box sx={{ px: 3, pt: 2, pb: 1 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  color: theme.palette.common.black,
                }}
              >
                Flashcards
              </Typography>
            </Box>

            {/* Flashcards list */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                px: 3,
                pb: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {flashcardsArray.length === 0 ? (
                <Typography
                  sx={{
                    color: theme.palette.grey[600],
                    textAlign: 'center',
                    py: 4,
                  }}
                >
                  No flashcards available for this module.
                </Typography>
              ) : (
                flashcardsArray.map((flashcard, index) => (
                  <Paper
                    key={flashcard.id}
                    elevation={0}
                    sx={{
                      borderRadius: '16px',
                      bgcolor: theme.palette.info.light,
                      border: `1px solid ${theme.palette.info.main}`,
                      p: 2.5,
                      display: 'flex',
                      gap: 3,
                      '&:hover': {
                        borderColor: theme.palette.info.main,
                        boxShadow: `0 2px 8px rgba(0, 0, 0, 0.1)`,
                      },
                    }}
                  >
                    {/* Term/Question column */}
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: theme.palette.common.black,
                          lineHeight: 1.6,
                        }}
                      >
                        {flashcard.term}
                      </Typography>
                    </Box>

                    {/* Definition/Answer column */}
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: theme.palette.common.black,
                          lineHeight: 1.6,
                        }}
                      >
                        {flashcard.definition}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              )}
            </Box>
          </>
        ) : (
          /* Test mode */
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              px: 3,
              pb: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              position: 'relative',
            }}
          >
            {currentQuestion && (
              <>
                {/* Question card */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: '16px',
                    bgcolor: theme.palette.info.light,
                    border: `1px solid ${theme.palette.info.main}`,
                    p: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        color: theme.palette.common.black,
                      }}
                    >
                      Question
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        color: theme.palette.common.black,
                      }}
                    >
                      {currentQuestionIndex + 1}/{flashcardsArray.length}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.common.black,
                      lineHeight: 1.6,
                    }}
                  >
                    {currentQuestion.term}
                  </Typography>
                </Paper>

                {/* Answer choices - 2x2 grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                  }}
                >
                  {answerChoices.map((choice, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = choice.isCorrect;
                    const showCorrectFeedback = showFeedback && isCorrect && isSelected;
                    const showIncorrectFeedback = showFeedback && isSelected && !isCorrect;
                    const showCorrectAnswer = showFeedback && isCorrect && !isSelected;

                    return (
                      <Paper
                        key={index}
                        elevation={0}
                        onClick={() => handleAnswerClick(index)}
                        sx={{
                          borderRadius: '16px',
                          bgcolor: theme.palette.info.light,
                          border: `1px solid ${
                            showCorrectFeedback || showCorrectAnswer
                              ? '#4caf50'
                              : showIncorrectFeedback
                              ? '#f44336'
                              : theme.palette.info.main
                          }`,
                          p: 2.5,
                          position: 'relative',
                          cursor: showFeedback ? 'default' : 'pointer',
                          '&:hover': {
                            borderColor: showFeedback
                              ? undefined
                              : theme.palette.info.main,
                            boxShadow: showFeedback
                              ? undefined
                              : `0 2px 8px rgba(0, 0, 0, 0.1)`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                          }}
                        >
                          {/* Label (A, B, C, D) */}
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '0.875rem',
                              color: theme.palette.common.black,
                              minWidth: '24px',
                            }}
                          >
                            {choice.label}
                          </Typography>
                          {/* Definition text */}
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              color: theme.palette.common.black,
                              lineHeight: 1.6,
                              flex: 1,
                            }}
                          >
                            {choice.definition}
                          </Typography>
                          {/* Feedback icons */}
                          {showCorrectFeedback && (
                            <CheckCircleIcon
                              sx={{
                                color: '#4caf50',
                                fontSize: '1.5rem',
                              }}
                            />
                          )}
                          {showIncorrectFeedback && (
                            <CancelIcon
                              sx={{
                                color: '#f44336',
                                fontSize: '1.5rem',
                              }}
                            />
                          )}
                          {showCorrectAnswer && (
                            <CheckCircleIcon
                              sx={{
                                color: '#4caf50',
                                fontSize: '1.5rem',
                              }}
                            />
                          )}
                        </Box>
                      </Paper>
                    );
                  })}
                </Box>

                {/* Skip button */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                  }}
                >
                  <Button
                    onClick={handleSkip}
                    variant="contained"
                    sx={{
                      borderRadius: '16px',
                      bgcolor: theme.palette.common.black,
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      '&:hover': {
                        bgcolor: theme.palette.common.black,
                      },
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

