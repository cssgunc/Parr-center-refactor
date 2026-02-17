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
    choiceExplanations: [
      'Correct! HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.',
      'This is incorrect. The correct acronym is HyperText Transfer Protocol, not High Transfer Text Protocol.',
      'This is incorrect. HTTP uses "Transfer" not "Transmission", and "Protocol" not "Process".',
      'This is incorrect. HTTP uses "HyperText" not "High Text", and "Transfer Protocol" not "Transfer Process".'
    ],
    explanation:
      'HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.',
  },
  {
    prompt: 'Which HTTP status code indicates a resource was not found?',
    choices: ['200', '301', '404', '500'],
    correctIndex: 2,
    choiceExplanations: [
      '200 indicates success, not a resource not found error.',
      '301 indicates a permanent redirect, not a resource not found error.',
      'Correct! 404 means Not Found — the server cannot find the requested resource.',
      '500 indicates a server error, not a resource not found error.'
    ],
    explanation: '404 means Not Found — the server cannot find the requested resource.',
  },
  {
    prompt: 'Which method is used to retrieve data from a server in REST?',
    choices: ['GET', 'POST', 'PUT', 'DELETE'],
    correctIndex: 0,
    choiceExplanations: [
      'Correct! GET is used to retrieve data from a server without side effects.',
      'POST is used to create or submit data to a server, not retrieve it.',
      'PUT is used to update existing resources on a server, not retrieve them.',
      'DELETE is used to remove resources from a server, not retrieve them.'
    ],
    explanation: 'GET is used to retrieve data without side effects.',
  },
  {
    prompt: 'Which protocol secures HTTP traffic?',
    choices: ['FTP', 'SMTP', 'HTTPS', 'SSH'],
    correctIndex: 2,
    choiceExplanations: [
      'FTP is a file transfer protocol, not used to secure HTTP traffic.',
      'SMTP is an email protocol, not used to secure HTTP traffic.',
      'Correct! HTTPS (HTTP over TLS) secures HTTP traffic by encrypting it.',
      'SSH is a secure shell protocol, not used to secure HTTP traffic (though it can be used for secure connections).'
    ],
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
    choiceExplanations: [
      'Correct! CORS stands for Cross-Origin Resource Sharing and allows controlled access to resources on different origins.',
      'This is incorrect. CORS uses "Resource Sharing" not "Request Service", and "Cross-Origin" not "Client-Origin".',
      'This is incorrect. CORS uses "Resource Sharing" not "Request Service".',
      'This is incorrect. CORS allows cross-origin sharing, not client-only sharing.'
    ],
    explanation: 'CORS stands for Cross-Origin Resource Sharing and allows controlled access to resources on different origins.',
  },
  ],
};
