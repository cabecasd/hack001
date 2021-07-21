import React from "react"
import { Link } from "react-router-dom"

function InitialPage() {

    return (
        <div>
            <div>
                <Link to="/profile">
                <button>
                    Sou um jovem.
                </button>
                </Link>
                <Link to="/home">
                <button>
                    Sou uma assossitatiionz
                </button>
                </Link>
            </div>
        </div>
    )
    
}

export default InitialPage