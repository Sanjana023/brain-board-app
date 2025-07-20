import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/check`, {
          method: 'GET',
          credentials: 'include', // include HTTP-only cookie
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking auth...</div>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
