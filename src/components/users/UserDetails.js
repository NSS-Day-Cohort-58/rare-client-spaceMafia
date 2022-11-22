import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUsers, getUserById } from "../../managers/UserManager"
import "./UserDetails.css"

export const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getUserById(userId)
                .then(data => setUsers(data))
        },
        [userId]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8000/users/${userId}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("auth_token")}`

                }
            })
                .then(res => res.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
        },
        [userId]
    )

    return <section className="user-details"> <div className="user-details_title">Rare User Details</div>
        <button className="btn-all-users"
            onClick={() => navigate(`/users`)}
        >All Users</button>

        <section key={`user--${user.id}`} className="user" to={`/users/${user.id}`}>
            <div className="">

                <div className="user-name">Name: {user.full_name} </div>
                <div className="user-username">Username: {user.user?.username}</div>
                {/* <img className="user-image" src={user.author?.profile_image} /> */}
                <div className="user-creation">Profile Creation Date: {user.user?.date_joined}</div>
                <div className="user-email">Email: {user.user?.email}</div>
                <div className="user-bio">Bio: {user.bio}</div>
                <button className="btn-userSubscribe">Subscribe</button>
                <button className="btn-userSubscribe">Unsubscribe</button>
            </div>
        </section>
    </section >
}