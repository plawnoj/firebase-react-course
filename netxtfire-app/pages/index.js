import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Loader from '../components/Loader';
//issues importing toast, this import statement here seems to compile fine
//import in _app.js is causing issues
//furthur investigation shows multiple copies of react installed
//dependency tree might be fucked 
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <div>
      
      <button onClick={() => toast.success('hello toast!')}>
        click me!
      </button>
    </div>
  )
}
