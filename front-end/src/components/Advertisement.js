import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Advertisement.module.css';
import styles1 from '../styles/HomePage.module.css'

function Advertisement() {
    const [ad, setAd] = useState({})
    const { username } = useParams()

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const user = await fetch(`/users/name/${username}`)
        const data = await user.json()
        setAd(data.user)
    }
    return (
        <>
            <img className= {styles1.background} src="../cleaning.jpg"></img>
            <div className={styles.advertisement}>
                <h2>{ad.fullName}</h2>

                {
                    ad && <div className={styles.box}>
                        <div className={styles.image}><img src={`/photo/${ad.username}`}></img></div><br></br>
                        <div className={styles.text}><p >texto sobre o anúncio</p></div>
                    </div>
                }
            </div>
        </>
    )
}

export default Advertisement;