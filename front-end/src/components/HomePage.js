import styles from '../styles/HomePage.module.css'
import BoxAdv from './BoxAdv';
import { BiSearchAlt2 } from "react-icons/bi";

function HomePage() {
    async function handleSearch(e) {
        const res = await fetch(`/search?q=${e.target.value}`)

    }
    
    return (
        <>
        <div className={styles.home}>
            <h2>Feed</h2>
        <div>
            <input className = {styles.searchBar}
                type="text"
                id="pesquisa"
                onChange = {(e) => handleSearch(e)}
                placeholder="Podes pesquisar por..."
                onChange={(e) => handleSearch(e)}
            />
            <button className = {styles.button} ><BiSearchAlt2 /></button>
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