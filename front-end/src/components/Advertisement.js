import styles from '../styles/Advertisement.module.css'

function Advertisement() {
    return (
        <>
        <div className={styles.home}>
            <h2>Advertisement</h2>
 
            <div className = {styles.box}>
                <div className={styles.image}><p>Imagem</p></div><br></br>
                <div className={styles.text}><p >texto sobre o anúncio</p></div>
            </div>
            
        </div>
        </>
    )
}

export default Advertisement;