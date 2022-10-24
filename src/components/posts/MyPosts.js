import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getPosts } from "../../managers/PostsManger"
import { getUsers } from "../../managers/UserManager"

export const MyPosts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [allUsers, setUsers] = useState([])
    const [dateSortedPosts, setDateSortedPosts] = useState([])

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
        }, []
    )

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
                        <section className="postDetails" key={`task--${dateSortedPost.id}`}>
                            <div className="titleDiv"><Link className="" to={`/posts/${dateSortedPost.id}`} >Title: {dateSortedPost.title}</Link></div>
                            {
                                allUsers.map((user) => {
                                    if (user.id === dateSortedPost.user_id)
                                        return <div className="authorDiv">Author: {user.username}</div>
                                })
                            }
                            {
                                categories.map((category) => {
                                    if (category.id === dateSortedPost.category_id)
                                        return <div className="categoryDiv">Category: {category.label}</div>
                                })
                            }
                            <div className="contentDiv">Content: {dateSortedPost.content}</div>
                            <footer className="postFooter">Date: {dateSortedPost.publication_date}</footer>
                        </section>
                        <footer className="cardButtons">
                            <button >
                                Edit Post
                            </button>
                            <button
                                >
                                Delete Post
                            </button>
                        </footer>
                </> 
                }
            )
        }
    </article>
}