import Link from 'next/link';

export default function PostFeed({ posts, admin }){
    //returning the actual feed of posts
    //how the feed of posts actually converts to html and how it appears to end user 
    //exports them to the DOM as PostItem with the tags of: post(post id), key(url to get to post)
    //and the admin tag of whether or not the user logged in is the owner of that post 
    //if admin is true, end user will be able to edit the post 
    return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }){
    //Naive method to calc word count and read time
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);
    console.log(`${post.username}`);
    // this function apparently doesn't have global scope to access correct documents from firebase not sure why
    return (
        <div className="card">
            <Link href={`/${post.username}`}>
                <a>
                    <strong>By @{post.username}</strong>
                </a>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a>{post.title}</a>
                </h2>
            </Link>

            <footer>
                <span>
                    {wordCount} words. {minutesToRead} min read
                </span>
                <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
            </footer>
            {/* If admin view, show extra controls for user */}
            {admin && (
                <>
                    <Link href={`/admin/${post.slug}`}>
                        <h3>
                            <button className="btn-blue">Edit</button>
                        </h3>
                    </Link>

                    {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
                </>
            )}
        </div>
    );


}