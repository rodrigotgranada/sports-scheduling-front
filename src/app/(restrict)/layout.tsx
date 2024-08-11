"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Atualize para next/navigation
import { verifyAuth } from '@/utils/auth';

interface Props {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyAuth();
      if (!isAuth) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // ou qualquer outro componente de loading
  }

  if (!isAuthenticated) {
    return null; // ou redirecionar para uma página de login
  }

  return <>{children}</>;
};

export default ProtectedLayout;
