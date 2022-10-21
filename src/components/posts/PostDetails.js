import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { deletePost, getPostById } from "../../managers/PostsManger"

export const PostDetails = () => {

    const [posts, setPosts] = useState({})
    const { postId } = useParams()


    useEffect(() => {
        if (postId) {
            getPostById(postId).then((res) => {
                setPosts(res)
            })
        }
    }, [postId])

    /*
    Details Display should 
        Title
        Author's name
        Category
        Publication date
        Content
    */

    return <article className="post_">
        <h2>Post Details:</h2>
        <section className="postDetails">
            <div>
                <div className="details__title">Title: {posts.title}</div>
                <div className="details__author--name">Author Named: {posts.user_id}</div>
                <div className="details__category">Category: {posts.category_id}</div>
                <div className="details__publication--date">Publication Date: {posts.publication_date}</div>
                <div className="details__content">Content: {posts.content}</div>
            </div>
            <button className="btn_delete-post" onClick={() => deletePost(posts.id)}>DELETE</button>
            <button className="btn_delete-post" onClick={() => deletePost(posts.id)}>DELETE</button>
            <button className="btn_delete-post" onClick={() => deletePost(posts.id)}>DELETE</button>
        </section>

    </article>







}