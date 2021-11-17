//importing auth and googleAuthProvider from the firebase hook
import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Enter(props){
    const { user, username } = useContext(UserContext); //grabbing user context 
    //1. user signed out <SignInButton />
    //2. user signed in but missing username <UsernameForm />
    //3. user signed in, has username <SignOutButton />
    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    );
}

//Sign in with google button
function SignInButton(){
    const signInWithGoogle = async () => {
        try { //not sure if this try catch block will work, we'll see in production
            await auth.signInWithPopup(googleAuthProvider); //creates the modal for end user to sign in
        } catch (error) {
            console.log('uwu there was an error');
        }
    };


    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            <img src={'./google.png'} /> Sign in with Google
        </button>
    );

}

//Sign out button
function SignOutButton(){
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

//Username form
function UsernameForm(){
    // needed filler for now as it was angry at me for not returning anything out of this 
    return <h1>owo</h1> 
}