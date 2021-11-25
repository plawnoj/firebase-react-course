//User Profile page > what comes up when end user clicks on profile icon in top right 
//Importing components for UserProfile and PostFeed for end user 
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';

//function that performs the server sided rendering 
export async function getServerSideProps({ query }){
  //query is the /{usernameSlug} of the url, we can grab the Username from here
  const { username } = query; //promise username from query
  //getting userDoc from helper function in firebase.js that grabs user collection for username
  const userDoc = await getUserWithUsername(username); 
  
  //JSON serializable data 
  let user = null; //data set to null for default for JSON purposes 
  let posts = null; 
  
  if (userDoc){ //if userDoc != null
    user = userDoc.data(); //set user = user collection returned from getUserWithUsername()
    const postsQuery = userDoc.ref  //query for posts under user's post collection if they have them
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    //the extra tags on this command define how the posts will be returned 
    //setting posts = data that is returned by query for posts, and that data is passed through 
    //postToJSON helper function inside of firebase.js > serializes data from firestore 
    posts = (await postsQuery.get()).docs.map(postToJSON); 
  }

  return {
    props: { user, posts }, //will be passed to the page component as props 
  };
}


export default function UserProfilePage({ user, posts }) {
  return (
    <main>
        <UserProfile user={user} />
        <PostFeed posts={posts} />
    </main>
  );
}