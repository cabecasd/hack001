import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useFormik } from "formik"
import styles from '../styles/Login.module.css'

function InitialPage() {
    return (
        <>
        
        <div className={styles.backgroundWrapper}><img className={styles.background} src = "../cleaning.jpg"></img></div>
        <div className={styles.loginOuter}>
            <div>
                <img src="sintraamiga.png"></img>

                    <div className={styles.boxes}>
                        <div className={styles.login}>
                            <Login />
                            <div>
                                <Link to="/account">
                                        <p className={styles.registoBtn}> Ainda não tens conta? Faz o teu registo <b>aqui.</b> </p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.boxA}>
                            <p>É uma associação e procura jovens para realizar trabalhos voluntários?</p>
                            <Link to="/home">
                                <button className={styles.buttonAssociation}>
                                    Entrar
                                </button>
                            </Link>
                        </div>
                    </div> 
            </div>
        </div>
        </>
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
                <div>
                <label className= {styles.formlabel} htmlFor="username">Utilizador</label><br />
                <input
                    type="text"
                    id="username"
                    className={styles.forminput}
                    placeholder="Digite o seu nome..."
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                </div>
                <div>
                <label className={styles.formlabel} htmlFor="username">Password</label><br />
                <input
                    type="text"
                    id="password"
                    className={styles.forminput}
                    placeholder="Introduza a sua password..."
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <br />
                <button className={styles.button} variant="primary" type="submit">Login</button>
        </div>
            </form>
        </div>
    )
}


export default InitialPage