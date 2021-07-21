import styles from '../styles/HomePage.module.css'
import BoxAdv from './BoxAdv';

function HomePage() {
    async function handleSearch(e) {
        const res = await fetch(`/search?q=${e.target.value}`)

    }
    return (
        <>
        <div className={styles.home}>
            <h2>HomePage</h2>
        <div>
            <input className = {styles.searchBar}
                type="text"
                id="pesquisa"
                placeholder="Podes pesquisar por..."
                onChange={(e) => handleSearch(e)}
            />
            <button className = {styles.button} >Pesquisar</button>
        </div>
            <BoxAdv />
            <BoxAdv />
            <BoxAdv />
            <BoxAdv />
            <BoxAdv />
        </div>
        </>
    )
}

export default HomePage;