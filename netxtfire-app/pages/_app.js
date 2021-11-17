import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context'; //this threw a fit for a weird reason

import { useUserData } from '../lib/hooks'; //simplified app.js by moving auth hook to hooks.js

function MyApp({ Component, pageProps }) {
  const userData = useUserData(); //user data at this point is comprised of {user, username}

  return (
    /*
      userContext provider is giving the current auth state in the form of user, username
      and passing that to the child components inside div tree so those details are accessible from
      components listed under the parent userContext
    */
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
