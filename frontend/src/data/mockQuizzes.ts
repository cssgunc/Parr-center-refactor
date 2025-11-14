import { QuizQuestion } from '@/lib/firebase/types';

// Simple mock quiz (used for testing). Contains questions plus a passingScore.
export const mockQuizzes: { questions: QuizQuestion[]; passingScore: number } = {
  passingScore: 70,
  questions: [
  {
    prompt: 'What does HTTP stand for?',
    choices: [
      'HyperText Transfer Protocol',
      'High Transfer Text Protocol',
      'HyperText Transmission Process',
      'High Text Transfer Process',
    ],
    correctIndex: 0,
    explanation:
      'HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.',
  },
  {
    prompt: 'Which HTTP status code indicates a resource was not found?',
    choices: ['200', '301', '404', '500'],
    correctIndex: 2,
    explanation: '404 means Not Found — the server cannot find the requested resource.',
  },
  {
    prompt: 'Which method is used to retrieve data from a server in REST?',
    choices: ['GET', 'POST', 'PUT', 'DELETE'],
    correctIndex: 0,
    explanation: 'GET is used to retrieve data without side effects.',
  },
  {
    prompt: 'Which protocol secures HTTP traffic?',
    choices: ['FTP', 'SMTP', 'HTTPS', 'SSH'],
    correctIndex: 2,
    explanation: 'HTTPS (HTTP over TLS) secures HTTP traffic by encrypting it.',
  },
  {
    prompt: 'What does CORS stand for?',
    choices: [
      'Cross-Origin Resource Sharing',
      'Client-Origin Request Service',
      'Cross-Origin Request Service',
      'Client-Only Resource Sharing',
    ],
    correctIndex: 0,
    explanation: 'CORS stands for Cross-Origin Resource Sharing and allows controlled access to resources on different origins.',
  },
  ],
};
