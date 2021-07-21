import React from 'react'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom"; 
import styles from '../styles/NavBar.module.css'


function NavBar() {
        return (
        <div className={styles.navBar}>
            <div>
                <Link to = "/home"><BsFillHouseDoorFill className={styles.home}/></Link>
            </div>
            <div>
                <img  className={styles.logo} alt="logo Sintra amiga" src="/sintraamiga.png" />
            </div>
        </div>
        )
}

export default NavBar;