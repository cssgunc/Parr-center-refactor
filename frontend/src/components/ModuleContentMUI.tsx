import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moduleVideos, { ModuleVideo } from "@/data/moduleVideos";
import Link from 'next/link';
import { Video } from "./Video";
import { getModuleById, getUserProgress, startUserProgress } from "@/lib/firebase/db-operations";
import { Module } from "@/lib/firebase/types";
import JournalEntry from "./JournalEntry";
import { getFirstMockFreeResponseStep } from "@/data/mockFreeResponseSteps";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ModuleContentProps {
  moduleId: string;
  index: number;
  userId: string;
}

export default function ModuleContentMUI({ moduleId, index, userId }: ModuleContentProps) {
  const [showVideoView, setShowVideoView] = useState(false);
  const [numSteps, setNumSteps] = useState<number>(0);
  const [numCompletedSteps, setNumCompletedSteps] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  
  // Reset video view when module changes
  useEffect(() => {
    setShowVideoView(false);
  }, [moduleId]);

  const [content, setContent] = useState<Module | null>(null);

  const handleStartModule = async () => {
    const currProgress = await getUserProgress(userId, moduleId.toString());
    if (!currProgress) {
      startUserProgress(userId, moduleId.toString());
    } else {
      // Module already started; maybe navigate to last viewed step
      // Navigate to page for last viewed step referencing currProgress
    }
  }

  useEffect(() => {
    if (!moduleId) return;
  
    const fetchContent = async () => {
      const content = await getModuleById(moduleId);
      const stepCount = content ? content.stepCount : 0;
      const progress = await getUserProgress(userId, moduleId);
      const started = progress ? true : false;
      const completedSteps = progress ? progress.completedStepIds.length : 0;
      setStarted(started);
      setNumCompletedSteps(completedSteps);
      setContent(content);
      setNumSteps(stepCount);
      setNumCompletedSteps(completedSteps);
    };

    fetchContent();

  }, [moduleId]);

  if (!content) {
    return (
      <Box>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: (t) => t.palette.grey[800],
          }}
        >
          Module {moduleId}
        </Typography>
        <Typography 
          sx={{
            mt: 2,
            color: (t) => t.palette.grey[700],
          }}
        >
          No content available for this module yet.
        </Typography>
      </Box>
    );
  }

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Journal Entry View
  // if (showJournalEntry) {
  //   const mockStep = getFirstMockFreeResponseStep();
  //   if (mockStep) {
  //     return (
  //       <JournalEntry
  //         freeResponseStep={mockStep}
  //         onBack={() => setShowJournalEntry(false)}
  //       />
  //     );
  //   }
  // }

  // Video View
  // if (showVideoView) {
  //   return (
  //     <Video moduleId={moduleId} />
  //   );
  // }

  // Overview View
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: '8vw',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-secondary)',
          color: (t) => t.palette.error.main,
          mb: 0.5,
        }}
      >
        Welcome to Module {index + 1}
      </Typography>
      
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-secondary)',
          color: (t) => t.palette.error.main,
          mb: 4,
        }}
      >
        {content?.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 4,
        }}
      >
        {started ? (
        <Button
          onClick = {() => handleStartModule()}
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: '16px',
            bgcolor: (t) => t.palette.common.black,
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.25rem',
            '&:hover': {
              bgcolor: (t) => t.palette.common.black,
            },
          }}
        >
          Continue Module
        </Button>
        ) : (
          <Button
          onClick = {() => handleStartModule()}
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: '16px',
            bgcolor: (t) => t.palette.common.black,
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.25rem',
            '&:hover': {
              bgcolor: (t) => t.palette.common.black,
            },
          }}
        >
          Start Module
        </Button>
        )}
        <Link href={`/modules/${moduleId}/journal`} passHref>
          <Button
            variant="contained"
            component="a"
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: '16px',
              bgcolor: (t) => t.palette.common.black,
              color: 'white',
              fontSize: '1.25rem',
              '&:hover': {
                bgcolor: (t) => t.palette.common.black,
              },
            }}
          >
            View Journal
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
          }}
        >
          Current Progress
        </Typography>
        <Box className="flex flex-row gap-5 mt-5">
          {Array.from({ length: numSteps }, (_, i) => i + 1).map((step) => (
            <Box key={step}>
              {step <= numCompletedSteps ? (
                <div className="w-[50px] h-[50px] rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-800 min-w-[32px] p-0 bg-green-600 hover:bg-green-700">
                  {step}
                </div>
              ) : (
                <div className="w-[50px] h-[50px] rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-800 min-w-[32px] p-0 bg-gray-100 hover:bg-gray-200">
                  {step}
                </div>
              )}
            </Box>
          ))}
          {numSteps > 0 && numCompletedSteps === numSteps && (
            <CheckCircleIcon 
              sx={{
                color: (t) => t.palette.success.main,
                fontSize: '2rem',
                alignSelf: 'center',
              }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
          }}
        >
          Module Overview
        </Typography>
        <Typography
          sx={{
            color: (t) => t.palette.common.black,
            lineHeight: '1.6',
          }}
        >
          {content?.description}
        </Typography>
      </Box>
    </Box>
  );
}