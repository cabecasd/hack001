import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useFormik } from "formik"
import styles from '../styles/Login.module.css'

function InitialPage() {
    return (
        <div className={styles.login}>
            <div>
                <div className={styles.loginbox}>
                    <Login />
                </div>
                <Link to="/account">
                    <button>
                        criar conta
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

const Login = () => {
    const history = useHistory()
    const formik = useFormik({
        initialValues: { username: "", password: "" },
        onSubmit: values => { verifyLogin(values) }
    })

    async function verifyLogin(values) {
        const res = await fetch("/authentication", {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        })
        if (res.status === 404) {
            alert("algo correu mal")
        } else {
            const data = await res.json()
            console.log(data.loginInfo.user._id)
            history.push(`/profile/${data.loginInfo.user._id}`)
        }

    }

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
                <button className="login" variant="primary" type="submit">Login</button>
            </form>
        </div>
    )


}


export default InitialPage