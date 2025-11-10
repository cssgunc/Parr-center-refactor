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
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [suppressFlipAnimation, setSuppressFlipAnimation] = useState(false);
  
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
  const currentFlashcard = flashcardsArray[currentFlashcardIndex] ?? null;

  // Get module title for the header
  const moduleTitle = modulesContent[moduleId]?.title || `Module ${moduleId}`;

  // Reset state when opening or module changes
  useEffect(() => {
    if (open) {
      setCurrentFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [open, moduleId]);

  useEffect(() => {
    if (flashcardsArray.length === 0) {
      setCurrentFlashcardIndex(0);
      return;
    }
    if (currentFlashcardIndex >= flashcardsArray.length) {
      setCurrentFlashcardIndex(0);
    }
  }, [flashcardsArray, currentFlashcardIndex]);

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
            {'Flashcard Deck: ' + moduleTitle}
          </Typography>
        </Box>

        {/* Content area - Flashcards single-card view */}
        <>
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
              <>
                <Paper
                  elevation={0}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFlipped}
                  onClick={() => {
                    if (!currentFlashcard) return;
                    setIsFlipped((f) => !f);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      if (!currentFlashcard) return;
                      setIsFlipped((f) => !f);
                    }
                  }}
                  sx={{
                    borderRadius: '16px',
                    p: 0,
                    minHeight: '240px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    perspective: '1000px',
                    '&:hover': {
                      boxShadow: `0 2px 8px rgba(0, 0, 0, 0.1)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      minHeight: '240px',
                      transformStyle: 'preserve-3d',
                      transition: suppressFlipAnimation ? 'none' : 'transform 0.6s ease',
                      transform: isFlipped ? 'rotateX(180deg)' : 'none',
                      '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                      },
                    }}
                  >
                    {/* Front face */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        borderRadius: '16px',
                        p: 4,
                        bgcolor: theme.palette.info.light,
                        border: `1px solid ${theme.palette.info.main}`,
                        '&:hover': {
                          borderColor: theme.palette.info.main,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.125rem',
                          color: theme.palette.common.black,
                          lineHeight: 1.7,
                          textAlign: 'center',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {currentFlashcard?.term || ''}
                      </Typography>
                    </Box>
                    {/* Back face */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateX(180deg)',
                        borderRadius: '16px',
                        p: 4,
                        bgcolor: theme.palette.info.light,
                        border: `1px solid ${theme.palette.info.main}`,
                        '&:hover': {
                          borderColor: theme.palette.info.main,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.125rem',
                          color: theme.palette.common.black,
                          lineHeight: 1.7,
                          textAlign: 'center',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {currentFlashcard?.definition || ''}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                      onClick={() => {
                        if (flashcardsArray.length === 0) return;
                        setSuppressFlipAnimation(true);
                        setIsFlipped(false);
                        setCurrentFlashcardIndex((i) =>
                          (i - 1 + flashcardsArray.length) % flashcardsArray.length
                        );
                        setTimeout(() => {
                          setSuppressFlipAnimation(false);
                        }, 0);
                      }}
                    sx={{
                      borderRadius: '16px',
                      color: theme.palette.common.black,
                      borderColor: theme.palette.common.black,
                      px: 3,
                      py: 1,
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: theme.palette.common.black,
                      },
                    }}
                  >
                    Previous
                  </Button>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      color: theme.palette.common.black,
                    }}
                  >
                    {currentFlashcardIndex + 1}/{flashcardsArray.length}
                  </Typography>
                  <Button
                    variant="contained"
                      onClick={() => {
                        if (flashcardsArray.length === 0) return;
                        setSuppressFlipAnimation(true);
                        setIsFlipped(false);
                        setCurrentFlashcardIndex((i) => (i + 1) % flashcardsArray.length);
                        setTimeout(() => {
                          setSuppressFlipAnimation(false);
                        }, 0);
                      }}
                    sx={{
                      borderRadius: '16px',
                      bgcolor: theme.palette.common.black,
                      color: 'white',
                      px: 3,
                      py: 1,
                      fontWeight: 'bold',
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
        </>
      </DialogContent>
    </Dialog>
  );
}

