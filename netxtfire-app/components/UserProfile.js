
//User Profile Component 
export default function UserProfile({ user }){
    return (
        <div className="box-center">
            <img src={user.photoURL || '/hacker.jpg'} className="card-img-center" />
            <p>
                <i>@{user.username}</i> 
            </p>
            <h1>{user.displayName || 'Anonymous User'}</h1> 
        </div>
    );
}