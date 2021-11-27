import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Loader from '../components/Loader';
import PostFeed from '../components/PostFeed';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { useState } from 'react';

/*
*fixed dependency issue > had to mess around with parent child dependency tree's and mess around
*with what is installed where, moved react-hot-toast to /nextfire-app/node_modules instead of putting it 
*in the parent directory
*/
// import toast from 'react-hot-toast';

//Max post to query per page 
const LIMIT = 1; 

export async function getServerSideProps(context){
  //*this is the actual query that is being rendered server side, its a collectionGroup query and 
  //*i created the composite index for posts collectionGroup, however the data that is being returned is coming
  //*back null only on the feed page > posts load correctly on userProfiles which is confusing 
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  
  return {
    props: { posts }, // will be passed to the page component as props
  };

}


//this is going to be turned into the feed page that for the first 10 items of the feed will be rendered server side
//any extra posts the end user wants will have a request put in and automatically added to their feed 
export default function Home(props) {
  const [posts, setPosts] = useState(props.posts); //state for posts was 'post' shouldve been posts
  const [loading, setLoading] = useState(false); //state for loading

  const [postsEnd, setPostsEnd] = useState(false); //state for post end

  const getMorePosts = async () => {
    setLoading(true); 
    const last = posts[posts.length - 1];
    //weird timestamp thing to handle both server sided generated and client generated timestamps in posts
    //forces it to use the firestore timestamp standard
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);
    
    
    const newPosts = (await query.get()).docs.map((doc) => doc.data());
    console.log(newPosts);
    setPosts(posts.concat(newPosts));

    setLoading(false);

    if (newPosts.length < LIMIT){
      setPostsEnd(true);
    }

  };


  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && <button onClick={getMorePosts}>load more</button>}

      <Loader show={loading} />

      {postsEnd && 'end of feed owo'}

    </main>
  );
}
