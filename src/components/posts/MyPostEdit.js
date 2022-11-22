import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getPostById, saveEditedPost } from "../../managers/PostsManger"

export const MyPostEdit = () => {
    const { postId } = useParams()
    const [categories, setCategories] = useState([])
    const [currentPost, setCurrentPosts] = useState({
        user_id: 0,
        category: 0,
        author: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true
    })

    const navigate = useNavigate()

    const renderPost = () => {
        postId
            ? getPostById(postId).then((res) => { setCurrentPosts(res) })
            : <></>
    }

    useEffect(() => {
        renderPost()
    }, [postId])

    useEffect(
        () => {
            getCategories()
                .then(data => setCategories(data))
        },
        []
    )

    const changePostState = (domPost) => {
        const value = domPost.target.value
        setCurrentPosts({ ...currentPost, [domPost.target.name]: value })
    }
    return <>
        <article className="post__edit-a box p-5">
            <form className="post__edit-b Form box p-5">
                <div className="mb-5"><span className="is-bold mr-3">Author:  </span><span className="title is-3">{currentPost.author.full_name}</span></div>
                <div className="mb-3">
                    <label htmlFor="title">Title: </label>
                    <input
                        required autoFocus
                        name="title"
                        type="text"
                        className="input"
                        placeholder={currentPost.title}
                        value={currentPost.title}
                        onChange={changePostState}
                    />
                </div>

                <div className="columns">
                    <label htmlFor="category">Category: </label>
                    <div className="select is-primary mb-3 ml-3 mr-6">
                        <select
                            onChange={changePostState}
                            name="category"
                            className="form-control select">
                            <option value={currentPost.category_id}>{currentPost.category.label}</option>
                            {
                                categories.map(category => <option
                                    key={category.id}
                                    value={category.id}
                                    className="form-control ">
                                    {category.label}</option>)
                            }
                        </select>
                    </div>
                    <div className="column ml-5">
                        <div>
                            <button className="button is-success is-large is-fullwidth">Approved</button>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="content">Content: </label>
                    <input
                        required autoFocus
                        name="content"
                        type="text"
                        className="form-control input"
                        placeholder={currentPost.content}
                        value={currentPost.content}
                        onChange={changePostState}
                    />
                </div>

                <div className="is-size-7 is-italic">Publication Date: {currentPost.publication_date}</div>
            </form>



            <div className="field has-addons">
                <p className="control">
                    <button onClick={evt => {
                        evt.preventDefault()
                        const event = {
                            id: currentPost.id,
                            title: currentPost.title,
                            category: currentPost.category,
                            publication_date: currentPost.publication_date,
                            image_url: currentPost.image_url,
                            content: currentPost.content,
                            approved: true

                        }
                        saveEditedPost(event)
                            .then(() => navigate("/myPosts"))
                    }}
                        className="btn-accountSave button is-info">
                        Save
                    </button>
                </p>
                <p className="control">
                    <button
                        onClick={() => navigate(`/myPosts`)}
                        className="btn-accountCancel button">
                        Cancel
                    </button>
                </p>
            </div>
        </article>
    </>
}


{/* <button type="submit"
    onClick={evt => {
        // Prevent form from being submitted
        evt.preventDefault()

        const event = {
            id: currentEvent.id,
            organizer: currentEvent.organizer,
            description: currentEvent.description,
            game: currentEvent.game,
            date: currentEvent.date,
            time: currentEvent.time
        }

        // Send POST request to your API
        saveEditedEvent(event)
            .then(() => navigate("/events"))
    }}
    className="button is-primary ml-6">Update Event</button> */}