import React from 'react'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom"; 
import styles from '../styles/NavBar.module.css'


function NavBar() {
        return <div className={styles.navBar}>
            <Link to = "/home"><BsFillHouseDoorFill className={styles.casa}/></Link>
        </div>
}

export default NavBar;