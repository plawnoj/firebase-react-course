//file to generate user auth state context might need to change later to account for firestore implementation
import { createContext } from 'react';
export const UserContext = createContext({ user: null, username: null });