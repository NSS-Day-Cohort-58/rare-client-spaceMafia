import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getPostById } from "../../managers/PostsManger"
import { PostEdit } from "./PostEdit"

export const PostDetails = () => {

    const { postId } = useParams()
    const [categories, setCategories] = useState([])
    const [clickStatus, updateClickStatus] = useState(false)
    const [post, setPost] = useState({
        user_id: 0,
        category_id: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: false
    })

    const renderPost = () => {
        if (postId) {
            getPostById(postId).then((res) => {
                setPost(res)
            })
        }
    }

    useEffect(
        () => {
            getCategories()
                .then(data => setCategories(data))
        },
        []
    )

    useEffect(() => {

        renderPost()

    }, [postId])

    const defaultDisplay = () => {
        return <article className="post_details">
            <section className="postDetails">
                <div className="details__title">Title: {post.title}</div>
                <div className="details__author--name">Author: {post.user_id}</div>
                <div className="details__category">Category: {post.category_id}</div>
                <div className="details__publication--date">Publication Date: {post.publication_date}</div>
                <div className="details__content">Content: {post.content}</div>
            </section>
            <button onClick={() => updateClickStatus(true)}>Edit Post</button>
        </article>
    }

    return <main>
        <h2>Post Details:</h2>
        {
            clickStatus
            ? <PostEdit post={post} 
            setPost={setPost} 
            renderPost={renderPost} 
            categories={categories}
            updateClickStatus={updateClickStatus}/>
            : defaultDisplay()
        }
    </main>

}