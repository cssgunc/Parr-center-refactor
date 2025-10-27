'use client';

/**
 * ERROR COMPONENT FOR MODULES ROUTE
 * 
 * This component is displayed when there's an error loading the modules page.
 * It provides a user-friendly error message and recovery options.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          {/* Error Icon */}
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          {/* Error Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We encountered an error while loading the modules. This might be a temporary issue.
          </p>
          
          {/* Error Details (in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
              <p className="text-sm text-red-700 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
          
          {/* Recovery Actions */}
          <div className="space-x-4">
            <button
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
