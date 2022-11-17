import { useEffect, useState } from "react"
import { getUsers } from "../../managers/UserManager"
import './UserList.css'
import { Link } from "react-router-dom"


export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect (
        () => {
            getUsers()
            .then(data => setUsers(data))
        },
        []
    )

    return <section className="user-list"> <div className="user_title">Rare User List</div>
        {users.map(user => {
            return <div key={`user--${user.id}`} className="user">
                <div className="user-name"><Link to={`/users/${user.id}`}> Name: {user.author?.full_name}</Link></div>
                <div className="user-username">Username: {user.username}</div>
                <div className="user-email">Email: {user.email}</div>
            </div>
        
        })

    }
    </section>
}
