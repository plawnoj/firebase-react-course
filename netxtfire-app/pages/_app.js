import React from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
    </>
  )
}

export default MyApp
