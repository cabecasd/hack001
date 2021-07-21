import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Profile.module.css'
import Switch from '@material-ui/core/Switch';

function Profile() {
    const [user, setUser] = useState()
    const { id } = useParams();
    const [privateState, setPrivateState] = useState(false)
    const [editState, setEditState] = useState(false)

    useEffect(() => {
        getUserInfo()
    }, [])

    async function getUserInfo() {
        const res = await fetch(`/users/${id}`)
        const data = await res.json()
        setUser(data.user)
        console.log(data.user.private)
        setPrivateState(data.user.private)
    }

    const handleChange = () => {
        setPrivateState(!privateState);
        fetch("/toggleFavorite", {
            method: "PATCH",
            body: JSON.stringify({ privateState: !privateState, id }),
            headers: { "Content-Type": "application/json" }
        })
    };



    return (
        <>
            <div className={styles.profile}>
                <h2>Profile</h2>
                {
                    !editState ?
                        <UserDisplay user={user} handleChange={() => handleChange()} />
                        :
                        <EditUserProfile />
                }

                <button onClick={() => { setEditState(true) }}>Alterar perfil</button>

            </div>
        </>
    )
}

function UserDisplay(props) {

    return (
        <div>
            {
                props.user && <div>
                    <p>{props.user.fullName}</p>
                    <p>{props.user.email}</p>
                    <p>{props.user.username}</p>
                    <Switch
                        checked={props.privateState}
                        onChange={props.handleChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            }
        </div>
    )
}

function EditUserProfile(props) {
    const fileInputRef = useRef(null);
    function uploadPhoto(e) {
        console.log(e.target.value)
    }
    return (
        <input type="file" ref={fileInputRef} onChange={(e) => { uploadPhoto(e) }} />
    )
}

export default Profile;