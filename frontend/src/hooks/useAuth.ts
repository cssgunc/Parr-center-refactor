import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/firebaseConfig';

export function useAuth() {
  if (!auth) {
    // Return mock state when Firebase is not configured
    return [null, false, null] as const;
  }
  
  return useAuthState(auth);
}
