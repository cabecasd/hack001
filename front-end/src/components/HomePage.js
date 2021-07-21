import React from 'react'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom"; 


function Navbar() {
        return <div className="navBar">
            <Link to = "/home"><BsFillHouseDoorFill className="casa" />Voltar para a HOME</Link>
        </div>
}

export default Navbar;