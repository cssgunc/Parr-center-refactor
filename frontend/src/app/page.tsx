/**
 * HOME PAGE
 * 
 * This is the root page component that serves as the landing page for the application.
 * It provides a welcome message and navigation options for users to access different
 * parts of the learning management system.
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Application title and branding */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Parr Center Learning Platform
        </h1>
        
        {/* Welcome message explaining what the application does */}
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the learning management system
        </p>
        
        {/* Navigation buttons for accessing different parts of the application */}
        <div className="space-x-4">
          {/* Student Portal Button - Disabled placeholder for future feature */}
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            disabled // Disabled because this feature is not yet implemented
          >
            Student Portal (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
