import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { deletePost, getPosts } from "../../managers/PostsManger"
import { getUsers } from "../../managers/UserManager"
import "./Posts.css"

export const MyPosts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [allUsers, setUsers] = useState([])
    const [dateSortedPosts, setDateSortedPosts] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getPosts()
                .then((allPostsArray) => {
                    setAllPosts(allPostsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const myPosts = allPosts.filter(allPost => allPost.is_author)
            setFilteredPosts(myPosts)
        },
        [allPosts]
    )

    useEffect(
        () => {
            if (allPosts.is_author) {
                const myUser = allUsers.filter(user => allPosts.author.id === user.id)
                setUsers(myUser)
            }
        },
        [allPosts]
    )

    useEffect(
        () => {
            getCategories()
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        }, []
    )

    useEffect(
        () => {
            getUsers()
                .then((usersArray) => {
                    setUsers(usersArray)
                })
        }, []
    )

    useEffect(
        () => {
            const sortPosts = filteredPosts.sort((a, b) => (a.publication_date - b.publication_date) ? -1 : 1)
            setDateSortedPosts(sortPosts)
        }, [filteredPosts]
    )

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, dateSortedPost) => {
        let text = 'Are you sure you want to delete'
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        window.confirm(text)
            ? deletePost(dateSortedPost.id)
                .then(() => getPosts()
                    .then(data => setAllPosts(data)))
            : <></>
    }

    return <article className="allPosts">
        <h2 className="postsHeader title is-3">My Posts: </h2>
        <fieldset>
            <div className="dropDown">
                <label htmlFor="filterCategory" className="dropDownCategories mr-3">Choose Your Category:</label>
                <select className="editDropDown select"
                    onChange={(evt) => {
                        setCategoryId(parseInt(evt.target.value))
                    }}
                >
                    <option value={0}>See All Categories</option>
                    {
                        categories.map((category) => {
                            return <option value={`${category.id}`} key={`category--${category.id}`}>
                                {category.label}
                            </option>
                        })

                    }
                </select>
            </div>
        </fieldset>
        {
            dateSortedPosts.map(
                (dateSortedPost) => {
                    if (dateSortedPost.category.id === categoryId || categoryId === 0)
                        return <React.Fragment key={`posts--${dateSortedPost.id}`}>
                            <div className=" columns box" id="post__myPost">
                                <section className="postDetails column" key={`post--${dateSortedPost.id}`}>
                                    <div className="titleDiv"><Link className="" to={`/posts/${dateSortedPost.id}`}>Title: {dateSortedPost.title}</Link></div>
                                    {
                                        allUsers.map((user) => {
                                            if (user.id === dateSortedPost.user_id)
                                                return <div className="authorDiv has-text-left" key={`category--${user.id}`}>Author: {user.username}</div>
                                        })
                                    }
                                    {
                                        categories.map((category) => {
                                            if (category.id === dateSortedPost.category_id)
                                                return <div className="categoryDiv has-text-left" key={`category--${category.id}`}>Category: {category.label}</div>
                                        })
                                    }
                                    <div className="contentDiv has-text-left" >Content: {dateSortedPost.content}</div>
                                    <footer className="postFooter has-text-left" >Date: {dateSortedPost.publication_date}</footer>
                                </section>
                                <footer className="cardButtons">
                                    <div>
                                        <button className=" button is-small is-warning mb-1" id="btn_mypost" onClick={() => navigate(`/myPost/edit/${dateSortedPost.id}`)}>
                                            EDIT
                                        </button>
                                    </div>
                                    <div>
                                        <button className="btn_delete-post button is-small is-danger" id="btn_mypost" key={`post-${dateSortedPost.id}`} onClick={(evt) => { confirmDelete(evt, dateSortedPost) }}>DELETE</button>
                                    </div>

                                </footer>
                            </div>
                        </React.Fragment>
                }
            )
        }
    </article>
}
