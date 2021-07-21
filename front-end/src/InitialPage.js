import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import styles from './styles/Login.module.css'

function InitialPage() {
    return (
        <div className = {styles.login}>
            <div>
                <Login />

                <Link to="/home">
                    <button>
                        Sou uma assossitatiionz
                    </button>
                </Link>
            </div>
        </div>
    )
}

const Login = () => {
    const formik = useFormik({
        initialValues: { username: "", password: "" },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label className="formlabel" htmlFor="username">Utilizador</label>
                <input
                    type="text"
                    id="username"
                    className="forminput"
                    placeholder="Digite o seu nome..."
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />

                <label className="formlabel" htmlFor="username">Password</label>
                <input
                    type="text"
                    id="password"
                    className="forminput"
                    placeholder="Introduza a sua password..."
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <Link to = "/profile"><button className="login" variant="primary" type="submit">Login</button></Link>
            </form>
        </div>
    )


}


export default InitialPage