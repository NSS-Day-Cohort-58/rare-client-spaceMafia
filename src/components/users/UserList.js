import { useEffect, useState } from "react"
import { getUsers } from "../../managers/UserManager"
import './UserList.css'

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
                <header className="user_label">Username:  {user.username}</header>
                <div className="user-name">First Name:  {user.first_name}</div>
                <div className="user-name">Last Name:  {user.last_name}</div>
                <footer className="user-email">Email:  {user.email}</footer>
            </div>
        
        })

    }
    </section>
}