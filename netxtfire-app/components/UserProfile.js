
//User Profile Component 
export default function UserProfile({ user }){
    return (
        <div className="box-center">
            <img src={user.photoURL || '/hacker.jpg'} className="card-img-center" />
            <p>
                <i>@{user.username}</i> //print the @ of the user 
            </p>
            <h1>{user.displayName || 'Anonymous User'}</h1> //depending on user auth state im assuming 
        </div>
    );
}