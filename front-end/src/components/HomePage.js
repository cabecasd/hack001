import styles from '../styles/HomePage.module.css';
import BoxAdv from './BoxAdv';
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from 'react';

function HomePage() {
    const [ads, setAds] = useState([])
    const [values, setValues] = useState("")

    useEffect(() => {
        handleLoad()
    }, [])
    //////////////////////////
    //trata da pesquisa enquanto se escreve
    async function handleSearch(e) {
        // const res = await fetch(`/search?q=${e.target.value}`)
        setValues(e.target.value)
    }

    async function handleLoad() {
        const res = await fetch("/homepage")
        const data = await res.json()
        setAds(data.adsArray)
    }

    async function searchByText() {
        const res = await fetch(`/search?q=${values}`)
        const newAds = await res.json()
        setAds(newAds.newAds)
    }

    return (
    
        <div className={styles.mainWrapper}>
            <div className={styles.home}>
                <h2>Feed</h2>
                <h4>Aqui pode encontrar um perfil que se enquadre com a iniciativa da sua associação.</h4>
                <div>
                    <input className={styles.searchBar}
                        type="text"
                        id="pesquisa"
                        placeholder="Podes pesquisar por..."
                        onChange={(e) => handleSearch(e)}
                    />
                    <button className={styles.button} onClick={() => searchByText()}><BiSearchAlt2 /></button>
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