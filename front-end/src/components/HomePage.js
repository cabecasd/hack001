import styles from '../styles/HomePage.module.css'
import BoxAdv from './BoxAdv';

function HomePage() {
    function onSearch() {
        
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
            />
            <button className = {styles.button} onClick={onSearch}>Pesquisar</button>
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