import { saveEditedPost } from "../../managers/PostsManger"

export const PostEdit = ({post, setPost, renderPost, categories, updateClickStatus}) => {

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
                    <div>Author: {post.user.first_name} {post.user.last_name}</div>
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
                                <option value={post.category_id}>{post.category.label}</option>
                                {
                                    categories.map(category => <option
                                    key={category.id}
                                    value={category.id}
                                    className="form-control">
                                    {category.label}</option>)
                                }
                        </select>
                    </fieldset>
                    <div>Publication Date: {post.publication_date}</div>
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