import styles from '../styles/HomePage.module.css';
import { Link } from "react-router-dom";

function BoxAdv(props) {
    const toLink = props.ad.username.replace(/\s+/g, '-')

    return (
        <>
         <img className= {styles.background} src="../cleaning.jpg"></img>
        <Link to={`/advertisement/${toLink}`} style={{textDecoration: "none", color: "black"}}>
            <div className={styles.box}>
                <img src={`/photo/${toLink}`} className={styles.image}></img>
                <div className={styles.block}>
                    <h4>{props.ad.fullName}</h4>
                    <p>{props.ad.summary}</p>
                </div>
            </div>
        </Link>
        </>
    )
}

export default BoxAdv;