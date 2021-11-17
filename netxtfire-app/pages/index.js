import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Loader from '../components/Loader';
//issues importing toast, this import statement here seems to compile fine
//import in _app.js is causing issues
//furthur investigation shows multiple copies of react installed
//dependency tree might be fucked 
/*
*fixed dependency issue > had to mess around with parent child dependency tree's and mess around
*with what is installed where, moved react-hot-toast to /nextfire-app/node_modules instead of putting it 
*in the parent directory
*/
import toast from 'react-hot-toast';


export default function Home() {
  return (
    <div className="container">
      <button className="btn btn-blue" onClick={() => toast.success('pog')}>
        click me!
      </button>
    </div>
  )
}
