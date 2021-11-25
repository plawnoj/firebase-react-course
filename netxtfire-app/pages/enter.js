// importing auth, firestore and googleAuthProvider from the firebase hook
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context'; //user context from contex.js

// for managing reactive parts of the form below
import { useEffect, useState, useCallback, useContext } from 'react'; 
//* debounce is what waits for end user to stop typing for 500ms to query firestore database
import debounce from 'lodash.debounce'; 

export default function Enter(props){
    const { user, username } = useContext(UserContext); //grabbing user context 
    //1. user signed out <SignInButton />
    //2. user signed in but missing username <UsernameForm />
    //3. user signed in, has username <SignOutButton />
    return (
        <main>
             
             {/* come back to this and learn the syntax, but this is basically saying
             depending on the current auth state of the window and userContext 
             show them the following screen */}
            
            {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />} 
        </main>
    );
}

//*Sign in with google button
function SignInButton(){
    const signInWithGoogle = async () => {
        try { //not sure if this try catch block will work, we'll see in production
            await auth.signInWithPopup(googleAuthProvider); //creates the modal for end user to sign in
        } catch (error) {
            console.log('uwu there was an error'); //hehe funny error message go brr
        }
    };


    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            <img src={'./google.png'} /> Sign in with Google
        </button>
    );

}

//*Sign out button
function SignOutButton(){
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

//*Username form
//this is going to turn into a chunky bit of code, make sure to go through and understand whats happening
function UsernameForm(){
    //this syntax confuses me
    const [formValue, setFormValue] = useState(''); 
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { user, username } = useContext(UserContext);

    /*
    * this function makes the actual write to the firestore database with the contents of the 
    * username field and the current user that is signed in
    * both a user document and a username document are created and stored with all the 
    * identification information for the end user
    */
    const onSubmit = async (e) => {
        try {
            e.preventDefault(); //prevents default browser behavior of wanting to refresh page on submit
    
            // Create refs for both documents
            const userDoc = firestore.doc(`users/${user.uid}`); //pointing to user's collection
            const usernameDoc = firestore.doc(`usernames/${formValue}`); //pointing to usernames collection
    
            // Commit both docs together as batch write
            const batch = firestore.batch(); //init batch var
            //setting the writes to be commited to firestore collections for both user's and usernames
            batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
            batch.set(usernameDoc, { uid: user.uid });
            await batch.commit(); //async await that commits the files to firestore
        } catch (error) {
            console.log('there was an oopsie woopsie fucky wucky' /n);
            console.log(error);
        }
    };

    /*
    * the state of the username field is asynchronusly being passed thorugh to the on change
    * function via the onChange={onChange} tag on the input field for username
    * the declaration onChange = (e) => is what allows this to happen asynchronusly
    * onChange is what manages the state of the form asyncronusly 
    */
    const onChange = (e) => { 
        //Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/; //regex ew fucking disgusting -_-       

        if (val.length < 3){
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
        
        if (re.test(val)){
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };
    useEffect(() => {
        checkUsername(formValue);

    }, [formValue]);


    //* hit database for username match after each debounced change
    //* useCallback is required for debounce to work
    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3){ //if length >= 3 query the database for existing username
                //! when referencing firestore collections use ` instead of ' 
                const ref = firestore.doc(`usernames/${username}`); //pointer for username document in firestore
                const { exists } = await ref.get(); //exists is a promise attached to grabbing the username data from firestore
                console.log('firestore read executed uwu'); //console log to show interaction with firestore
                setIsValid(!exists); //will be a valid username if it does not exist
                setLoading(false); //update loading state
            }
        }, 500), //500ms wait time for user to stop typing before querying firestore - debounce allows this
        []
    );

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    <button type="submit" className="btn-green" disabled={!isValid}>
                    Choose
                    </button>
    
                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                         <br />
                        Loading: {loading.toString()}
                         <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
          </section>
        )
    );
}
//*Function that allows for the dynamic message listed below username field 
function UsernameMessage({ username, isValid, loading }){
    if (loading){
        return <p>checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid){
        return <p className="text-danger">{username} is already taken!</p>;
    } else {
        return <p></p>;
    }
}