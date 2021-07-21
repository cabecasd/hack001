import styles from '../styles/HomePage.module.css'

function HomePage() {
    
    return (
        <>
        <div className={styles.home}>
            <h2>HomePage</h2>
            <div className = {styles.box}>
                <p>Imagem</p><br></br>
                <p>texto sobre o anúncio</p>
            </div>
        </div>
        </>
    )
}

export default HomePage;