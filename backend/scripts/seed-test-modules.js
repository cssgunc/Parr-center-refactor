/**
 * SEED TEST MODULES SCRIPT
 *
 * This script populates Firestore with test modules and steps for development/testing.
 *
 * Setup:
 * 1. Place your service account key JSON file in the backend directory
 *    (e.g., parr-center-bdec6-firebase-adminsdk-fbsvc-269caa1b8e.json)
 * 2. Update the SERVICE_ACCOUNT_PATH below to match your filename
 * 3. Run from backend directory: node scripts/seed-test-modules.js
 *
 * Note: The service account key is in .gitignore and will not be committed to git. But please double check.
 */

const admin = require('firebase-admin');
const path = require('path');

// UPDATE THIS PATH to match your service account key filename
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '..', 'parr-center-bdec6-firebase-adminsdk-fbsvc-269caa1b8e.json');

// Initialize Firebase Admin
const serviceAccount = require(SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const USER_ID = "USER_ID_HERE";

async function seedTestModules() {
  console.log('Starting to seed test modules...\n');

  // MODULE 1: Complete module with all 4 step types
  await db.collection('modules').doc('testmodule1').set({
    title: 'Complete Learning Module',
    description: 'A comprehensive module demonstrating all four step types: video, quiz, flashcards, and free response.',
    createdBy: USER_ID,
    collaborators: [USER_ID],
    isPublic: true,
    tags: ['test', 'complete', 'demo'],
    stepCount: 4,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Video step
  await db.collection('modules').doc('testmodule1').collection('videos').add({
    type: 'video',
    title: 'Introduction Video',
    order: 0,
    estimatedMinutes: 10,
    isOptional: false,
    createdBy: USER_ID,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    durationSec: 600,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Quiz step
  await db.collection('modules').doc('testmodule1').collection('quizzes').add({
    type: 'quiz',
    title: 'Knowledge Check Quiz',
    order: 1,
    estimatedMinutes: 5,
    isOptional: false,
    createdBy: USER_ID,
    shuffle: true,
    questions: [
      {
        prompt: 'What is the capital of France?',
        choices: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctIndex: 2,
        choiceExplanations: [
          'London is the capital of England, not France.',
          'Berlin is the capital of Germany, not France.',
          'Paris is the capital and largest city of France.',
          'Madrid is the capital of Spain, not France.'
        ],
        explanation: 'Paris is the capital and largest city of France.' // Legacy field for backward compatibility
      },
      {
        prompt: 'Which of the following is a programming language?',
        choices: ['HTML', 'CSS', 'JavaScript', 'All of the above'],
        correctIndex: 2,
        choiceExplanations: [
          'HTML is a markup language used to structure web content, not a programming language.',
          'CSS is a styling language used to style web pages, not a programming language.',
          'JavaScript is a full-featured programming language that can be used for both frontend and backend development.',
          'Not all options are programming languages - only JavaScript qualifies.'
        ],
        explanation: 'JavaScript is a programming language, while HTML and CSS are markup and styling languages.' // Legacy field
      }
    ],
    passingScore: 70,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Flashcards step
  await db.collection('modules').doc('testmodule1').collection('flashcards').add({
    type: 'flashcards',
    title: 'Key Terms Flashcards',
    order: 2,
    estimatedMinutes: 8,
    isOptional: false,
    createdBy: USER_ID,
    cards: [
      {
        front: 'What is a variable?',
        back: 'A named storage location in memory that holds a value which can change during program execution.'
      },
      {
        front: 'What is a function?',
        back: 'A reusable block of code that performs a specific task and can be called by name.'
      },
      {
        front: 'What is an array?',
        back: 'A data structure that stores a collection of elements, typically of the same type, in a contiguous memory location.'
      }
    ],
    studyMode: 'spaced',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Free response step
  await db.collection('modules').doc('testmodule1').collection('freeResponses').add({
    type: 'freeResponse',
    title: 'Reflection Essay',
    order: 3,
    estimatedMinutes: 15,
    isOptional: false,
    createdBy: USER_ID,
    prompt: 'Reflect on what you learned in this module. How will you apply these concepts in your own projects?',
    sampleAnswer: 'Through this module, I gained a deeper understanding of fundamental programming concepts. I plan to apply these concepts by building a simple web application that demonstrates the use of variables, functions, and arrays.',
    maxLength: 500,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log('testmodule1 created');

  // MODULE 2: Empty module with no steps
  await db.collection('modules').doc('testmodule2').set({
    title: 'Empty Module Template',
    description: 'This module serves as a template with no steps added yet. Perfect for starting from scratch.',
    createdBy: USER_ID,
    collaborators: [USER_ID],
    isPublic: true,
    tags: ['test', 'empty', 'template'],
    stepCount: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log('testmodule2 created');

  // MODULE 3: Partial module with only quiz and free response
  await db.collection('modules').doc('testmodule3').set({
    title: 'Assessment-Focused Module',
    description: 'A module focused on assessments, containing only quiz and free response steps.',
    createdBy: USER_ID,
    collaborators: [USER_ID],
    isPublic: true,
    tags: ['test', 'partial', 'assessment'],
    stepCount: 2,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Quiz step
  await db.collection('modules').doc('testmodule3').collection('quizzes').add({
    type: 'quiz',
    title: 'Final Assessment Quiz',
    order: 0,
    estimatedMinutes: 10,
    isOptional: false,
    createdBy: USER_ID,
    shuffle: false,
    questions: [
      {
        prompt: 'What does HTTP stand for?',
        choices: [
          'HyperText Transfer Protocol',
          'High Transfer Text Protocol',
          'HyperText Transmission Process',
          'High Text Transfer Process'
        ],
        correctIndex: 0,
        choiceExplanations: [
          'Correct! HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.',
          'This is incorrect. The correct acronym is HyperText Transfer Protocol, not High Transfer Text Protocol.',
          'This is incorrect. HTTP uses "Transfer" not "Transmission", and "Protocol" not "Process".',
          'This is incorrect. HTTP uses "HyperText" not "High Text", and "Transfer Protocol" not "Transfer Process".'
        ],
        explanation: 'HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.' // Legacy field
      },
      {
        prompt: 'Which HTTP method is used to retrieve data?',
        choices: ['POST', 'GET', 'PUT', 'DELETE'],
        correctIndex: 1,
        choiceExplanations: [
          'POST is used to create or submit data to a server, not retrieve it.',
          'Correct! GET is the HTTP method used to retrieve data from a server without side effects.',
          'PUT is used to update existing resources on a server, not retrieve them.',
          'DELETE is used to remove resources from a server, not retrieve them.'
        ],
        explanation: 'GET is used to retrieve data from a server.' // Legacy field
      },
      {
        prompt: 'What is REST?',
        choices: [
          'A type of database',
          'A programming language',
          'An architectural style for APIs',
          'A web browser'
        ],
        correctIndex: 2,
        choiceExplanations: [
          'REST is not a database type. It\'s an architectural style for designing web services.',
          'REST is not a programming language. It\'s a set of principles for API design.',
          'Correct! REST (Representational State Transfer) is an architectural style for designing networked applications and APIs.',
          'REST is not a web browser. It\'s a design pattern for building web services.'
        ],
        explanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications.' // Legacy field
      }
    ],
    passingScore: 80,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Free response step
  await db.collection('modules').doc('testmodule3').collection('freeResponses').add({
    type: 'freeResponse',
    title: 'API Design Exercise',
    order: 1,
    estimatedMinutes: 20,
    isOptional: false,
    createdBy: USER_ID,
    prompt: 'Design a RESTful API for a simple blog application. Include endpoints for creating, reading, updating, and deleting blog posts. Explain your design choices.',
    sampleAnswer: 'GET /posts - Retrieve all posts\nGET /posts/:id - Retrieve a specific post\nPOST /posts - Create a new post\nPUT /posts/:id - Update an existing post\nDELETE /posts/:id - Delete a post\n\nI chose RESTful conventions because they provide a clear, standardized way to interact with resources. Each endpoint follows the HTTP method that best describes its action.',
    maxLength: 1000,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log('testmodule3 created');
  console.log('\nAll test modules seeded successfully');
}

seedTestModules()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding modules:', error);
    process.exit(1);
  });
