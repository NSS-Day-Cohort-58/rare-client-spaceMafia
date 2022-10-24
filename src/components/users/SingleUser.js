import { Link } from "react-router-dom"
import { getUsers, getUserById } from "../../managers/UserManager"

export const User = () => {
    return <section className="user">
    <div>
        <Link to={`/users/${userDetails.id}`}> Name: {first_name} {last_name}</Link>
    </div>
    <img className="user-image" src={userDetails.profile_image_url}/>
    <div className="user-username">Username: {userDetails.username}</div>
    <div className="user-creation">Profile Creation Date: {userDetails.created_on}</div>
    <div className="user-bio">Bio: {userDetails.bio}</div>
    <div>Email: {userDetails.email}</div>
</section>
}