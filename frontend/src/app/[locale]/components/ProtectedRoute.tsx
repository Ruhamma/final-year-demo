import { useRouter } from 'next/navigation';
import { useAuth } from '../../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return router.push('/login');
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role.name)) {
    return router.push('/unauthorized');
  }

  return <>{children}</>;
}; 