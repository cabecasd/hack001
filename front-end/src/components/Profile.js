import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Profile.module.css'

function Profile() {
    const [user, setUser] = useState()
    const { id } = useParams();

    useEffect(() => {
        getUserInfo()
    }, [])

    async function getUserInfo() {
        const res = await fetch(`/users/${id}`)
        const data = await res.json()
        console.log(data)
        setUser(data.user)
    }

    return (
        <>
            <div className={styles.profile}>
                <h2>Profile</h2>

                {
                    user && <div>
                        <p>{user.fullName}</p>
                        <p>{user.email}</p>
                        <p>{user.username}</p>
                    </div>
                }
            </div>
        </>
    )
}

export default Profile;