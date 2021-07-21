import styles from '../styles/HomePage.module.css'
import { Link } from "react-router-dom"; 

function BoxAdv() {
    return (
        <Link to = "/advertisement"><div className = {styles.box}>
            <div className={styles.image}><p>Imagem</p></div><br></br>
            <div className={styles.text}><p >texto sobre o anúncio</p></div>
        </div>
        </Link>
    )
}

export default BoxAdv;