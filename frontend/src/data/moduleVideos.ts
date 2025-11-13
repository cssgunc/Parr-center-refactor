export interface ModuleVideo {
  title: string;
  youtubeUrl: string;
  duration?: number; // Duration in seconds (optional)
}

const moduleVideos: Record<number, ModuleVideo> = {
  1: {
    title: "Part 1: Immediate Engagement",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: What is Philosophy?
    duration: 600, // 10 minutes
  },
  2: {
    title: "Part 1: Introduction to Ethical Reasoning",
    youtubeUrl: "https://www.youtube.com/embed/3_t4obUc51A", // Crash Course Philosophy: How to Argue
    duration: 720, // 12 minutes
  },
  3: {
    title: "Part 1: Moral Philosophy Foundations",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: Utilitarianism
    duration: 660, // 11 minutes
  },
  4: {
    title: "Part 1: Deontological Ethics",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: Kant & Categorical Imperatives
    duration: 600, // 10 minutes
  },
  5: {
    title: "Part 1: Virtue Ethics",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: Aristotle & Virtue Theory
    duration: 660, // 11 minutes
  },
  6: {
    title: "Part 1: Applied Ethics",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: Natural Law Theory
    duration: 720, // 12 minutes
  },
  7: {
    title: "Part 1: Ethics Bowl Preparation",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: Contractarianism
    duration: 600, // 10 minutes
  },
  8: {
    title: "Part 1: Case Analysis Techniques",
    youtubeUrl: "https://www.youtube.com/embed/1A_CAkYt3GY", // Crash Course Philosophy: Where Does Your Mind Reside?
    duration: 660, // 11 minutes
  },
};

export default moduleVideos;

