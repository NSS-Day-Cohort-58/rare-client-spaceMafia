import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsers, getUserById } from "../../managers/UserManager"
import { Link } from "react-router-dom"
import "./UserDetails.css"

export const UserDetails = () => {
    const [users, setUsers] = useState([])
    const[userDetails, setUserDetails] = useState([])

    useEffect(
        () => {
            getUsers()
            .then(data => setUsers(data))
        },
        []
    )

    useEffect(
        () => {
            getUserById()
            .then(data => setUserDetails(data))
        },
        []
    )

    return <section className="user-details"> <div className="user-details_title">Rare User Details</div>
    {userDetails.map(userDetails => {
        return <section key={`user--${userDetails.id}`} className="user" to={`/users/${userDetails.id}`}>
            <div className="user-username">Username: {userDetails.username}</div>
            <div className="user-name">First Name: {userDetails.first_name}</div>
            <div className="user-name">Last Name: {userDetails.last_name}</div>
            <img className="user-image" src={userDetails.profile_image_url}/>
            <div className="user-creation">Profile Creation Date: {userDetails.created_on}</div>
            <div className="user-bio">Bio: {userDetails.bio}</div>
            <button className="btn-userSubscribe">Subscribe</button>
        </section>
    })

}
</section>
}