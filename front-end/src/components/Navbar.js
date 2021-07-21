import React from 'react'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom"; 
import styles from '../styles/NavBar.module.css'


function NavBar() {
        return <div className={styles.navBar}>
            <Link to = "/"><BsFillHouseDoorFill className={styles.casa} />Voltar para a HOME</Link>
        </div>
}

export default NavBar;