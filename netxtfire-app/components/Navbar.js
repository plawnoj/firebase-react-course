import Link from 'next/link';

//top navbar
export default function Navbar(){
    const user = null; //null/true: can get both user states based on whether or not user is signed in
    const username = null;

    // const { user, username } = { }; //not sure if this is needed rn 
    /*
    this is where i am leaving off 11/16
    basically just set up the nav bar > understanding page states based on whether or not the end user is 
    signed in > rendered to pages via app.js and a react component fragment > look through navbar.js to fully 
    understand what code is doing > play around with it a bit just to get comfy > yep > fuck i need to sleep
    it is 2 am and i have work at 7 wooooo
    */
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">feed</button>
                    </Link>
                </li>

                {/* user is signed in and has username */}
                {username && (
                    <>  
                        <li className="push-left">
                            <Link href="/admin">
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/${username}'}>
                                <img src={user?.photoURL}/>
                            </Link>
                            
                        </li>
                    </>
                )}

                {/* user is not signed in or has not created username */}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">login</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}