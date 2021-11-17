import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context'; //this threw a fit for a weird reason

//starting auth hook


function MyApp({ Component, pageProps }) {
  return (
    
    <UserContext.Provider value={{ user:{}, username: 'jeff'}}>
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
