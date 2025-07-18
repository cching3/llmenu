import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignedOut, useAuth } from '@clerk/clerk-react';
import { SignInPage } from './pages/SignInPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';
import { SearchPage } from './pages/SearchPage';
import { AboutTeamPage } from './pages/AboutTeam';
import { ErrorPage } from './pages/ErrorPage';
import { RecipesPage } from './pages/RecipesPage';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <SignInPage />
        } />
        
        <Route path="/about-team" element={
          // <ProtectedRoute>
            <AboutTeamPage />
          // </ProtectedRoute>
        } />
        
        <Route path="/search-recipes" element={
          // <ProtectedRoute>
            <SearchPage />
          // </ProtectedRoute>
        } />
        
        <Route path="/recipes/:id" element={
          // <ProtectedRoute>
            <RecipesPage />
          // </ProtectedRoute>
        } />
        
        <Route path="/*" element={
            <ErrorPage />
        } />
      </Routes>
    </Router>
  );
}

export default App;