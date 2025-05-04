'use client';
import { useGetMeQuery, useLogoutMutation } from '../app/services/auth';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { data: user, isLoading, error } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const hasRole = (role: string) => user?.role.name === role;
  const isAdmin = () => hasRole('ADMIN');
  const isSeller = () => hasRole('SELLER');
  const isBuyer = () => hasRole('BUYER');
  console.log(isSeller())

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const hasAnyRole = (roles: string[]) => {
    if (!user) return false;
    return roles.some(role => hasRole(role));
  };

  const hasAllRoles = (roles: string[]) => {
    if (!user) return false;
    return roles.every(role => hasRole(role));
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    hasRole,
    isAdmin: isAdmin(),
    isSeller: isSeller(),
    isBuyer: isBuyer(),
    hasAnyRole,
    hasAllRoles,
    logout: handleLogout,
  };
}; 