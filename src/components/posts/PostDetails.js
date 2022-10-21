import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getPostById, getPosts, saveEditedPost } from "../../managers/PostsManger"

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

    let foundCategory = ""
    if (post.category_id != 0) {
        foundCategory = categories.find(category => category.id === post.category_id)
    }

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

    const formatDate = (input) => {
        if (!input) {
            return input
        }
        const newDate = input.replace(/[^\d]/g, "")
        const newDateLength = newDate.length
        if (newDateLength < 5) { return newDate}
        if (newDateLength < 7) {
            return `${newDate.slice(0,4)}-${newDate.slice(4)}`
        }
        return `${newDate.slice(0,4)}-${newDate.slice(4, 6)}-${newDate.slice(6,8)}`
    }

    const handleDateInput = (event) => {
        const formattedDate = formatDate(event.target.value)
        const copy = {...post}
        copy.publication_date = formattedDate
        setPost(copy)
    }

    const handleSave = (event) => {
        event.preventDefault()   

        saveEditedPost(post)
            .then(() => updateClickStatus(false))
            .then(() => renderPost())
    }

    const handleCancel = (event) => {
        event.preventDefault()

        updateClickStatus(false)
        renderPost()
    }

    /*
    Details Display should 
        Title
        Author's name
        Category
        Publication date
        Content
    */

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

    const editDisplay = () => {
        return <article className="post__edit">
                <form className="post__editForm">
                    <fieldset>
                        <label htmlFor="title">Title: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder={post.title}
                            value={post.title}
                            onChange={
                                (event) => {
                                    const copy = {...post}
                                    copy.title = event.target.value
                                    setPost(copy)
                                }
                            } />
                    </fieldset>
                    <div>Author: {post.user_id}</div>
                    <fieldset>
                        <label htmlFor="category">Category: </label>
                        <select
                            onChange={
                                (event) => {
                                    const copy = {...post}
                                    copy.category_id = parseInt(event.target.value)
                                    setPost(copy)
                                }}
                            className="form-control">
                                <option value={post.category_id}>{foundCategory.label}</option>
                                {
                                    categories.map(category => <option
                                    key={category.id}
                                    value={category.id}
                                    className="form-control">
                                    {category.label}</option>)
                                }
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="publicationDate">Publication Date: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder={post.publication_date}
                            value={post.publication_date}
                            onChange={
                                (event) => (handleDateInput(event))
                            } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="content">Content: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder={post.content}
                            value={post.content}
                            onChange={
                                (event) => {
                                    const copy = {...post}
                                    copy.content = event.target.value
                                    setPost(copy)
                                }
                            } />
                    </fieldset>
                </form>
                <button onClick={(event) => handleSave(event)}
                    className="btn-accountSave">
                    Save
                </button>
                <button 
                    onClick={(event) => handleCancel(event)}
                    className="btn-accountCancel">
                    Cancel
                </button>
        </article>
    }

    return <main>
        <h2>Post Details:</h2>
        {
            clickStatus
            ? editDisplay()
            : defaultDisplay()
        }
    </main>

}