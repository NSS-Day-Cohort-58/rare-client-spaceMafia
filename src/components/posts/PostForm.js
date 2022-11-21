import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getPosts } from "../../managers/PostsManger"
import { getTags } from "../../managers/TagManager"

export const AddPost = () => {

    const localForumUser = localStorage.getItem("forum_user")
    const forumUserObject = JSON.parse(localForumUser)

    const [newPost, updateNewPost] = useState({
        author_id: 1,
        category_id: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true
    })
    const [postTag, updatePostTag] = useState({
        post_id: 0,
        tag_id: 0
    })
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)

    const newDate = new Date()
    const month = newDate.getUTCMonth() + 1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const formatDate = date.toLocaleString('en-us', {
        minimumIntegerDigits: 2
    })
    const formatMonth = month.toLocaleString('en-us', {
        minimumIntegerDigits: 2
    })
    const today = year + "-" + formatMonth + "-" + formatDate

    const navigate = useNavigate()



    const getNewPost = () => {
        getPosts()
            .then((newPostArray) => {
                updateNewPost(newPostArray)
            })
            .then(navigate('/posts'))
    }

    useEffect(() => {
        getCategories()
            .then((categoriesArray) => {
                setCategories(categoriesArray)
            })
    }, []
    )

    useEffect(() => {
        getTags()
            .then((tagsArray) => {
                setTags(tagsArray)
            })
    }, []
    )

    const handleButtonClick = (evt) => {
        evt.preventDefault()

        const newPostToSendToAPI = {
            author_id: evt.author.id,
            category_id: categoryId,
            title: newPost.title,
            publication_date: today,
            image_url: newPost.image_url,
            content: newPost.content,
            approved: true
        }

        const postTagsToSendToAPI = {
            tag_id: postTag.tag_id
        }

        fetch('http://localhost:8000/posts', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(newPostToSendToAPI)
        })
            .then(response => response.json())
            .then(parsedResponse => {
                postTagsToSendToAPI.post_id = parsedResponse.id
                return fetch(`http://localhost:8000/postTags`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("auth_token")}`
                    },
                    body: JSON.stringify(postTagsToSendToAPI)
                })
                    .then(response => response.json())
                    .then(() => {
                        getNewPost()
                    })
                    .then(response => response.json())
                    .then(() => {
                        getNewPost()
                    })
            })
    }

    return <form className="newPostForm">
        <h2 className="newPostFormTitle title is-4 mt-5 ml-5 mb-5">New Post</h2>
        <div className="box post__edit-a">
            <div className="box post__edit-b">
                <fieldset className="formData">
                    <label htmlFor="postTitle" className="postTitleLabel">Title:</label>
                    <input required autoFocus
                        type="text"
                        className="postTitle input"
                        placeholder="Title"
                        value={newPost.title}
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.title = evt.target.value
                            updateNewPost(copy)
                        }}
                    />
                </fieldset>

                <fieldset className="formData">
                    <label htmlFor="postImage" className="postImageLabel">Image URL:</label>
                    <input
                        type="text"
                        className="postImage input"
                        placeholder="Image URL"
                        value={newPost.image_url}
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.image_url = evt.target.value
                            updateNewPost(copy)
                        }}
                    />
                </fieldset>

                <fieldset className="formData">
                    <label htmlFor="postContent" className="postContentLabel">Content:</label>
                    <input
                        type="text"
                        className="postContent input"
                        placeholder="Enter your message."
                        value={newPost.content}
                        onChange={(evt) => {
                            const copy = { ...newPost }
                            copy.content = evt.target.value
                            updateNewPost(copy)
                        }}
                    />
                </fieldset>

                <fieldset>
                    <div className="formCatDropDown">
                        <label htmlFor="addCategories" className="bookCategoriesLabel mr-2">Category:</label>
                        <div className="select is-primary mb-3 ml-3 mr-6">
                            <select className="editDropDown select"

                                onChange={(evt) => {
                                    setCategoryId(parseInt(evt.target.value))
                                }}
                            >
                                <option value={0}>Select Category...</option>
                                {
                                    categories.map((category) => {
                                        return <option value={`${category.id}`} key={`category--${category.id}`}>
                                            {category.label}
                                        </option>
                                    })

                                }
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <h2 className="tagsTitle is-italic mb-2">Choose appropriate tags:</h2>
                    <div className="formGroup">
                        {
                            tags.map((tag) => {
                                return <React.Fragment key={`posts--${tag.id}`}>
                                    <label htmlFor="addTags" className="dustTagsLabel checkbox">{tag.name}: </label>
                                    <input
                                        type="checkbox"
                                        className="addTags mr-3"
                                        value={false}
                                        onChange={(evt) => {
                                            if (evt.target.checked === true) {
                                                const copy = { ...postTag }
                                                copy.tag_id = tag.id
                                                updatePostTag(copy)
                                            }
                                        }}
                                    />
                                </React.Fragment>
                            })
                        }
                    </div>
                </fieldset>
            </div>
            <button
                onClick={(clickEvent) => handleButtonClick(clickEvent)}
                className="btn btn-primary button is-success is-medium">
                <span className="icon">
                    <ion-icon name="book-outline"></ion-icon>
                </span>
                <span>Publish</span>
            </button>
        </div>
    </form>
}