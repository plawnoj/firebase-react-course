import { auth, googleAuthProvider } from '../lib/firebase';

export default function Enter(props){
    const user = null;
    const username = null;

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

}