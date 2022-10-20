import { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostsManger"

export const AllPosts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [dateSortedPosts, setDateSortedPosts] = useState([])

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
            const sortPosts = allPosts.sort((a,b) => a.publication_date = b.publication_date)
            setDateSortedPosts(sortPosts)
        }
    )

    return <article className="allPosts">
        All Posts:
        {
            dateSortedPosts.map(
                (dateSortedPost) => {
                    return <section className="postDetails">
                        <div className="titleDiv">Title: {dateSortedPost.title}</div>
                        <div className="authorDiv">Author: {dateSortedPost.user_id}</div>
                        <div className="categoryDiv">Category: {dateSortedPost.category}</div>
                        <div className="contentDiv">Content: {dateSortedPost.content}</div>
                        <footer className="postFooter">Date: {dateSortedPost.publication_date}</footer>
                    </section>  
                }
            )
        }
    </article>
}