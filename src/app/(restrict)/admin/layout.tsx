import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { verifyAdminAuth } from '@/utils/auth';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const isAdminAuth = await verifyAdminAuth();
      if (!isAdminAuth) {
        router.push('/login');
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    checkAdminAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // ou qualquer outro componente de loading
  }

  if (!isAdmin) {
    return null; // ou redirecionar para uma página de erro 403
  }

  return <>{children}</>;
};

export default AdminLayout;
