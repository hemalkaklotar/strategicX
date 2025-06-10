'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
const [isAuthChecked, setIsAuthChecked] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth/login');
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);
  if (!isAuthChecked) {
    return <div className="w-screen h-screen flex items-center justify-center">
        <i className="pi pi-spin pi-spinner text-4xl text-white"></i>
    </div>;
  }
  return <>{children}</>;
}