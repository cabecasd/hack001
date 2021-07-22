import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Advertisement.module.css';
import styles1 from '../styles/HomePage.module.css'
import { FaPhone } from "react-icons/fa";
import { GrMail } from "react-icons/gr";




function Advertisement() {
    const [ad, setAd] = useState({})
    const { username } = useParams()

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const user = await fetch(`/users/name/${username}`)
        const data = await user.json()
        console.log(data)
        setAd(data.user)
    }
    return (
        <>
            <img className={styles1.background} src="../cleaning.jpg"></img>
            <div className={styles.advertisement}>
                <h1>{ad.fullName}</h1>

                {
                    ad && <div className={styles.box}>
                        <div className={styles.topRow}>
                            <div><img className={styles.avatar} src={`/photo/${ad.username}`}></img></div>
                            <div className={styles.summAndCon}>
                                <div>{ad.summary}</div>
                                <div className={styles.contacts}>
                                    <p><FaPhone className={styles.icon} style={{ fill: "black" }} title="Número de telefone" />{ad.cellNumber}</p>
                                    <p><GrMail className={styles.icon} style={{ fill: "black" }} title="E-mail" />{ad.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.description}>
                            {ad.description}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Advertisement;