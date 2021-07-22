import styles from '../styles/HomePage.module.css'
import BoxAdv from './BoxAdv';
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from 'react';

function HomePage() {
    const [ads, setAds] = useState([])

    useEffect(() => {
        handleLoad()
    }, [])
    //////////////////////////
    //trata da pesquisa enquanto se escreve
    async function handleSearch(e) {
        const res = await fetch(`/search?q=${e.target.value}`)
    }

    async function handleLoad() {
        const res = await fetch("/homepage")
        const data = await res.json()
        console.log(data.adsArray)
        setAds(data.adsArray)
    }

    return (
    
        <div className={styles.mainWrapper}>
            <div className={styles.home}>
                <h2>Feed</h2>
                <div>
                    <input className={styles.searchBar}
                        type="text"
                        id="pesquisa"
                        onChange={(e) => handleSearch(e)}
                        placeholder="Podes pesquisar por..."
                        onChange={(e) => handleSearch(e)}
                    />
                    <button className={styles.button} ><BiSearchAlt2 /></button>
                </div>
                {
                    ads.map((ad, index) => {
                        return (
                            <div key={index}><BoxAdv ad={ad} /></div>
                        )
                    })
                }
            </div>

        </div>
    )
}


export default HomePage;