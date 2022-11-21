import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { deletePost, getPosts } from "../../managers/PostsManger"
import { getUsers } from "../../managers/UserManager"
import "./Posts.css"

export const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [dateSortedPosts, setDateSortedPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [allUsers, setUsers] = useState([])
    const navigate = useNavigate()

    // const localForumUser = localStorage.getItem("forum_user")
    // const forumUserObject = JSON.parse(localForumUser)


    useEffect(
        () => {
            getPosts()
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
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
            const sortPosts = posts.sort((a, b) => (a.publication_date - b.publication_date) ? -1 : 1)
            setDateSortedPosts(sortPosts)
        }, [posts]
    )


    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, dateSortedPost) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deletePost(dateSortedPost.id).then(() => navigate("/posts"))
            : <></>
    }

    return <article className="posts">
        <h2 className="postsHeader title is-3">Post List </h2>

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
                            <div className="columns box" id="posts__postDetails">
                                <section className="postDetails column">
                                    <div className="titleDiv">Title: <Link className="" to={`/posts/${dateSortedPost.id}`} >{dateSortedPost.title}</Link></div>
                                    <div className="authorDiv has-text-left" key={`post--${allUsers.id}`}>Author: {dateSortedPost.author.full_name}</div>
                                    <div className="categoryDiv has-text-left" key={`post-${dateSortedPost.id}`} >Category: {dateSortedPost.category.label}</div>
                                </section>
                                <footer className="">
                                    {
                                        dateSortedPost.is_author
                                            ? <button className="btn_delete-post button is-danger is-small" onClick={(evt) => { confirmDelete(evt, dateSortedPost) }}>DELETE</button>
                                            : <></>

                                    }
                                </footer>
                            </div>

                        </React.Fragment>
                }

            )
        }
    </article >
}