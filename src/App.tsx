import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { BookList } from './components/BookList';
import { LogOut } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated, isLoading, error, login, logout } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated ? (
          <>
            <nav className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">BookList</h1>
                  </div>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <BookList />
            </main>
          </>
        ) : (
          <LoginForm onLogin={login} isLoading={isLoading} error={error} />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;