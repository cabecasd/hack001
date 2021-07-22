import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Advertisement.module.css'

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
            <div className={styles.advertisement}>
                <h2>Anúncio</h2>

                {
                    ad.path && <div className={styles.box}>
                        <div className={styles.image}><img src={`/photo/${ad.username}`}></img></div><br></br>
                        <div className={styles.text}><p >texto sobre o anúncio</p></div>
                    </div>
                }
            </div>
        </>
    )
}

export default Advertisement;