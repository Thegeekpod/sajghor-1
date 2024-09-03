'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const router = useRouter();
  const [error, setError] = useState('Unknown error occurred');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setError(query.get('error') || 'Unknown error occurred');
  }, []);

  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
      <button onClick={() => router.push('/admin/login')}>Go Back to Login</button>
    </div>
  );
}
