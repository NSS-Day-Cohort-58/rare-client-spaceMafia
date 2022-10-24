import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { deletePost, getPosts } from "../../managers/PostsManger"
import { getUsers } from "../../managers/UserManager"
import "./Posts.css"

export const AllPosts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [dateSortedPosts, setDateSortedPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [allUsers, setUsers] = useState([])
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
            const sortPosts = allPosts.sort((a, b) => (b.publication_date - a.publication_date) ? 1 : -1)
            setDateSortedPosts(sortPosts)
        }
    )



    return <article className="allPosts">
        <h2 className="postsHeader">Posts: </h2>

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
                        return <section className="postDetails columns box is-centered" id="posts__postDetails" key={`post-${dateSortedPost.id}`}>
                            <form className="">
                                <div className="columns">
                                    <div className="titleDiv column is-one-quarter"><Link className="" to={`/posts/${dateSortedPost.id}`} >Title: {dateSortedPost.title}</Link></div>
                                    {
                                        allUsers.map((user) => {
                                            if (user.id === dateSortedPost.user_id)
                                                return <div className="authorDiv column" key={`post--${user.id}`}>Author: {user.username}</div>
                                        })
                                    }
                                    {
                                        categories.map((category) => {
                                            if (category.id === dateSortedPost.category_id)
                                                return <div className="categoryDiv column" key={`post-${category.id}`} >Category: {category.label}</div>
                                        })
                                    }

                                    <div className="contentDiv column block">Content: {dateSortedPost.content}</div>
                                    <div className="postFooter column block ">Date: {dateSortedPost.publication_date}</div>

                                    <div className="column is-centered">
                                        {
                                            dateSortedPost.user_id === forumUserObject.id
                                                ? <button className="btn_delete-post " key={`post-${dateSortedPost.id}`} onClick={() => deletePost(dateSortedPost.id).then(() => navigate("/posts"))}>DELETE</button>
                                                : <></>

                                        }
                                    </div>


                                </div>
                            </form>
                        </section>
                }

            )
        }
    </article>
}