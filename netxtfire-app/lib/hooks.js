import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useUserData(){
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      //turn off realtime subscription
      /*
        bunch of confusing auth stuff happening that is interacting with the firestore
        database in the background on fetching user details, i wanna say this is just going
        to be a copy paste solution for managing auth states with firebase
        look into this later to better understand whats happening in the backend
      */
      let unsubscribe;
  
      if (user){
        const ref = firestore.collection('users').doc(user.uid);
        unsubscribe = ref.onSnapshot((doc) => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
      return unsubscribe;
    }, [user]);
  return { user, username }
}