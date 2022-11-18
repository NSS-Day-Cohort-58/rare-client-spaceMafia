import { saveEditedPost } from "../../managers/PostsManger"

export const PostEdit = ({ post, setPost, renderPost, categories, updateClickStatus }) => {

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

    return <>
        <article className="post__edit-a box p-5">
            <form className="post__edit-b Form box p-5">
                <div className="mb-5"><span className="is-bold mr-3">Author:  </span><span className="title is-3">{post.author.full_name}</span></div>
                <div className="mb-3">
                    <label htmlFor="title">Title: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="input"
                        placeholder={post.title}
                        value={post.title}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.title = event.target.value
                                setPost(copy)
                            }
                        } />
                </div>

                <div className="columns">
                    <label htmlFor="category">Category: </label>
                    <div className="select is-primary mb-3 ml-3 mr-6">
                        <select
                            onChange={
                                (event) => {
                                    const copy = { ...post }
                                    copy.category.id = parseInt(event.target.value)
                                    setPost(copy)
                                }}
                            className="form-control select">
                            <option value={post.category.id}>{post.category.label}</option>
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
                        type="text"
                        className="form-control input"
                        placeholder={post.content}
                        value={post.content}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.content = event.target.value
                                setPost(copy)
                            }
                        } />
                </div>

                <div className="is-size-7 is-italic">Publication Date: {post.publication_date}</div>
            </form>



            <div className="field has-addons">
                <p className="control">
                    <button onClick={(event) => handleSave(event)}
                        className="btn-accountSave button is-info">
                        Save
                    </button>
                </p>
                <p className="control">
                    <button
                        onClick={(event) => handleCancel(event)}
                        className="btn-accountCancel button">
                        Cancel
                    </button>
                </p>
            </div>
        </article>
    </>
}