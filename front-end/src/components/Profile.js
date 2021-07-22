import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Profile.module.css'
import Switch from '@material-ui/core/Switch';
import { useFormik } from 'formik';

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
        fetch("/togglePrivate", {
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
                        <div>
                            <UserDisplay user={user} handleChange={() => handleChange()} toggleEdit={() => setEditState(true)} />

                        </div>
                        :
                        <div>
                            <EditUserProfile id={id} user={user} toggleEdit={() => setEditState(false)} />
                        </div>

                }



            </div>
        </>
    )
}

function UserDisplay(props) {

    return (
        <div className={styles.profile}>
            <div className={styles.personaldata}>
            {
                props.user && <div >
                    <p>{props.user.fullName}</p>
                    <p>{props.user.email}</p>
                    <p>{props.user.username}</p>
                    <p>{props.user.description}</p>
                    <Switch
                        checked={props.privateState}
                        onChange={props.handleChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            }
            <button className={styles.button} onClick={() => props.toggleEdit()}>Alterar perfil e criar anúncio</button>
            </div>
        </div>
    )
}

function EditUserProfile(props) {
    const fileInputRef = useRef(null);

    function saveChanges(values) {
        fetch(`/authentication/${props.id}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    function submitChanges(values) {
        props.toggleEdit()
        saveChanges(values)
    }

    const formik = useFormik({

        initialValues: {
            username: props.user.username, fullName: props.user.fullName, email: props.user.email,
            description: props.user.description
        },

        onSubmit: values => {
            submitChanges(values)
        }
    });

    function saveAdvertising(values){
        fetch(`/advertising/`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    function submitAdvertising(values){
        props.toggleEdit();
        saveAdvertising(values);
    }

    const formikAd = useFormik({
        initialValues: {
            title: "",
            advertising: "", 
            userId: props.user._id,
            email: props.user.email,
            fullName: props.user.fullName
        },

        onSubmit: values => {
            submitAdvertising(values)
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputs}>
                    <input className={styles.label}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="exemplo@outlook.com"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div className={styles.inputs}>
                    <input className={styles.label}
                        id="description"
                        name="description"
                        type="text"
                        placeholder=""
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <div>
                    {/* <input type="file" ref={fileInputRef} onChange={(e) => { uploadPhoto(e) }} /> */}
                </div>
                <button type="submit">Guardar Alterações</button>
            </form>

            <form onSubmit={formikAd.handleSubmit}>
                <div className={styles.inputs}>
                    <input className={styles.label}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Título"
                        onChange={formikAd.handleChange}
                        value={formikAd.values.title}
                    />
                </div>
                <div className={styles.inputs}>
                    <textarea className={styles.label}
                        id="advertising"
                        name="advertising"
                        type="text"
                        placeholder="coloque aqui o seu anuncio"
                        onChange={formikAd.handleChange}
                        value={formikAd.values.advertising}
                    />
                </div>
                <div>
                    {/* <input type="file" ref={fileInputRef} onChange={(e) => { uploadPhoto(e) }} /> */}
                </div>
                <button type="submit">Guardar Alterações</button>
            </form>


        </div>
    )
}

export default Profile;