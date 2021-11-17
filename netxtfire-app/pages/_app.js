import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context'; //this threw a fit for a weird reason

import { useUserData } from '../lib/hooks'; //simplified app.js by moving auth hook to hooks.js

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster 
        position="bottom-left"
        reverseOrder={false}
      />
    </UserContext.Provider>
    
  );
}

export default MyApp
