import React from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"

function InitialPage() {

    return (
        <div>
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
            fetch("/authentication", {
                method: "PATCH",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
            })
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
                <button className="login" variant="primary" type="submit">Login</button>
            </form>
        </div>
    )


}


export default InitialPage