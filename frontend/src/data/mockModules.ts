import { Module } from '@/types/module';

export const mockModules: Module[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React development',
    features: [
      {
        id: '1-1',
        type: 'video',
        title: 'What is React?',
        url: 'https://example.com/react-intro'
      },
      {
        id: '1-2',
        type: 'flashcards',
        title: 'React Concepts',
        cards: [
          { front: 'What is JSX?', back: 'JavaScript XML - syntax extension for JavaScript' },
          { front: 'What is a component?', back: 'A reusable piece of UI' }
        ]
      },
      {
        id: '1-3',
        type: 'quiz',
        title: 'React Basics Quiz',
        questions: [
          {
            question: 'What is React?',
            options: ['A library', 'A framework', 'A programming language', 'A database'],
            correctIndex: 0
          },
          {
            question: 'What does JSX stand for?',
            options: ['JavaScript XML', 'JavaScript Extension', 'Java Syntax XML', 'JSON Syntax Extension'],
            correctIndex: 0
          }
        ]
      },
      {
        id: '1-4',
        type: 'journal',
        title: 'Reflection on React',
        prompt: 'What did you find most interesting about React? How do you think it compares to other frameworks?'
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript concepts',
    features: [
      {
        id: '2-1',
        type: 'video',
        title: 'Closures Explained',
        url: 'https://example.com/closures'
      },
      {
        id: '2-2',
        type: 'video',
        title: 'Promises and Async/Await',
        url: 'https://example.com/promises'
      },
      {
        id: '2-3',
        type: 'flashcards',
        title: 'JavaScript Concepts',
        cards: [
          { front: 'What is a closure?', back: 'A function that has access to variables in its outer scope' },
          { front: 'What is the event loop?', back: 'The mechanism that handles asynchronous operations in JavaScript' }
        ]
      },
      {
        id: '2-4',
        type: 'quiz',
        title: 'Advanced JS Quiz',
        questions: [
          {
            question: 'What is hoisting?',
            options: ['Moving variables to the top', 'A type of function', 'A design pattern', 'A data structure'],
            correctIndex: 0
          }
        ]
      },
      {
        id: '2-5',
        type: 'journal',
        title: 'JavaScript Learning Journey',
        prompt: 'Describe your experience learning advanced JavaScript concepts. What challenges did you face?'
      }
    ]
  },
  {
    id: '3',
    title: 'CSS Fundamentals',
    description: 'Master the fundamentals of CSS styling',
    features: [
      {
        id: '3-1',
        type: 'video',
        title: 'CSS Selectors',
        url: 'https://example.com/css-selectors'
      },
      {
        id: '3-2',
        type: 'flashcards',
        title: 'CSS Properties',
        cards: [
          { front: 'What does display: flex do?', back: 'Creates a flexible container' },
          { front: 'What is the box model?', back: 'Content, padding, border, and margin' }
        ]
      },
      {
        id: '3-3',
        type: 'journal',
        title: 'CSS Design Thoughts',
        prompt: 'What design principles do you find most important when styling web pages?'
      }
    ]
  }
];
