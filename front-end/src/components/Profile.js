import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Profile.module.css';
import styles1 from '../styles/HomePage.module.css';
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
            <img className= {styles1.background} src="../cleaning.jpg"></img>
            <div className={styles.profile}>
                
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

            <h2>Perfil</h2>

                {
                    props.user && <div >
                        <p>{props.user.fullName}</p>
                        <p>{props.user.email}</p>
                        <p>{props.user.username}</p>
                        <p>{props.user.summary}</p>
                        <p>{props.user.description}</p>
                        <img src={`/photo/${props.user.username}`} />
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
            body: values
        })
    }

    function submitChanges(values) {
        props.toggleEdit()
        saveChanges(values)
    }

    const formik = useFormik({

        initialValues: {
            username: props.user.username, fullName: props.user.fullName, email: props.user.email,
            description: props.user.description, summary: props.user.summary
        },

        onSubmit: values => {
            const formData = new FormData();
            formData.append('photo', fileInputRef.current.files[0])
            formData.append('all', JSON.stringify(values))
            submitChanges(formData)
        }
    });

    function saveAdvertising(values) {
        fetch(`/advertising/`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    function submitAdvertising(values) {
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
                    <input className={styles.labelEmail}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="exemplo@outlook.com"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div className={styles.inputs}>
                    <textarea className={styles.label}
                        id="description"
                        name="description"
                        type="text"
                        placeholder="descrição"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <div className={styles.inputs}>
                    <textarea className={styles.labelSummary}
                        maxLength={140}
                        id="summary"
                        name="summary"
                        type="text"
                        placeholder="sumário"
                        onChange={formik.handleChange}
                        value={formik.values.summary}
                    />
                </div>
                
                <div className={styles.fileInputWrapper}>
                    <label htmlFor="file-input">
                        <img src={`/photo/${props.user.username}`} />
                    </label>

                    <input id="file-input" type="file" ref={fileInputRef}/>
                </div>
                <button className={styles.btnSave} type="submit">Guardar Alterações</button>
            </form>

        </div>
    )
}

export default Profile;