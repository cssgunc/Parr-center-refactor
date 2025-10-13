import YouTube, { YouTubeProps } from 'react-youtube';

export default function Video(props: { youtubeUrl: string; thumbnailUrl?: string; duration?: number ; module?: string}) {

  const videoId = getYouTubeId(props.youtubeUrl);

  const handleEnd: YouTubeProps['onEnd'] = (event) => {
    console.log('Video completed!', event);
    // CALL HELPER FUNCTION TO STORE PROGRESS that will be defined in /src/lib/firebase/db-operations.ts
    // updateUserProgress(userId, moduleId, completedStepId)
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 text-gray-700">
      <div>Watch The Video</div>
      <div className="border border-gray-300 rounded-lg p-4 shadow-md w-full max-w-xl">
        <YouTube
          videoId={videoId}
          opts={{
            width: '100%',
            height: '360',
            playerVars: {
              autoplay: 0,
              controls: 1,
            },
          }}
          onEnd={handleEnd}
        />
      </div>
    </div>
  );
}

function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}