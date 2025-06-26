// src/utils/useLogout.ts
'use client';

import createBrowserClient from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter(); // ✅ hook used *inside* a hook (legal)

  return async function logout() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/');
  };
}
