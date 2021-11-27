import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

/*
* Incremental Static Regeneration go brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
* This page is statically generated, but regenerated after new requests come in
* at an interval of 5000ms. If a pre-rendered page does not exist, will fall back to
* regular SSR.
*/

//function to render page server side statically 
export async function getStaticProps({ params }){
  const { username, slug } = params; //grabs the username and the post slug from url
  const userDoc = await getUserWithUsername(username); //grabs the user doc from helper function in firebase

  let post; //defining post and path variables
  let path;

  if (userDoc){ //if user doc exists
    const postRef = userDoc.ref.collection('posts').doc(slug); //reference to the post object in firebase 
    post = postToJSON(await postRef.get()); //setting post to JSON object

    path = postRef.path; //path to the post object in firebase
  }

  return { 
    props: { post, path }, //returns the post and path variables
    revalidate: 5000, //to hydrate data, will revalidate the query every 5 seconds 
  };

}

export async function getStaticPaths(){
  const snapshot = await firestore.collectionGroup('posts').get();
  
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });


  return {
    // must be in this format:
    // paths: [
    //  { params: { username, slug }}  
    //],
    paths,
    fallback: 'blocking', //tells next to fallback to normal SSR instead of rebuilding and redeploying with static content 
  };

}




export default function Post(props) {



  return (
    <main className="{styles.container}">



    </main>
  );
}