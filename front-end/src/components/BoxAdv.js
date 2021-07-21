import styles from '../styles/HomePage.module.css'
import { Link } from "react-router-dom";

function BoxAdv(props) {
    const toLink = props.ad.username.replace(/\s+/g, '-')
    console.log(toLink)

    return (
        <Link to={`/advertisement/${toLink}`}>
            <div className={styles.box}>
                <div className={styles.image}><p>Imagem</p></div>
                <div className={styles.block}>
                    <h4>{props.ad.fullName}</h4>
                    <p>{props.ad.description}</p>
                </div>
            </div>
        </Link>
    )
}

export default BoxAdv;