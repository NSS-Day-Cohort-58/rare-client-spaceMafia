import { useEffect, useState } from "react"
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

    const localForumUser = localStorage.getItem("forum_user")
    const forumUserObject = JSON.parse(localForumUser)

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
            const myPosts = allPosts.filter(allPost => allPost.user_id === forumUserObject.id)
            setFilteredPosts(myPosts)
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
            const sortPosts = filteredPosts.sort((a, b) => (b.publication_date - a.publication_date) ? 1 : -1)
            setDateSortedPosts(sortPosts)
        }
    )

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, dateSortedPost) => {
        let text = 'Are you sure you want to delete'
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        window.confirm(text)
            ? deletePost(dateSortedPost.id).then(() => navigate("/posts"))
            : <></>
    }

    return <article className="allPosts">
        <h2 className="postsHeader">{forumUserObject.username}'s Posts: </h2>
        <fieldset>
            <div className="dropDown">
                <label htmlFor="filterCategory" className="dropDownCategories">Choose Your Category:</label>
                <select className="editDropDown"
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
                    if (dateSortedPost.category_id === categoryId || categoryId === 0)
                        return <>
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
                                    <button>
                                        Edit Post
                                    </button>
                                    <button className="btn_delete-post " key={`post-${dateSortedPost.id}`} onClick={(evt) => { confirmDelete(evt, dateSortedPost) }}>Delete Post </button>
                                </footer>
                            </div>
                        </>
                }
            )
        }
    </article>
}