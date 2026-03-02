import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { normalizeYouTubeEmbedUrl } from "@/utils/youtube";
import { VideoStep } from "@/lib/firebase/types";

interface VideoStepProps {
  step: VideoStep;
}

export default function VideoStepView({ step }: VideoStepProps) {
  const videoData = step;
  const embedUrl = normalizeYouTubeEmbedUrl(videoData.youtubeUrl) ?? videoData.youtubeUrl;
  const [loading, setLoading] = useState(true);

  // Reset loading state when navigating between video steps
  useEffect(() => {
    setLoading(true);
  }, [step.id]);

  if (videoData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "65%" },
          p: { xs: 1.5, md: 4 },
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
          {videoData.title}
        </Typography>

        {/* Watch the Video Heading */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
          }}
        >

        </Typography>

        {/* YouTube Video Embed */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: "100%", md: "700px" },
            mx: "auto",
            mb: 4,
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: (t) => `0 4px 6px ${t.palette.grey[300]}`,
            "&::before": {
              content: '""',
              display: "block",
              paddingTop: "56.25%", // 16:9 aspect ratio
            },
          }}
        >
          {loading && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
          )}
          <Box
            component="iframe"
            src={embedUrl}
            onLoad={() => setLoading(false)}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              opacity: loading ? 0 : 1,
              transition: "opacity 0.4s ease-in-out",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Box>
    );
  }
}
