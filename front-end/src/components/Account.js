import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import styles from "../styles/Account.module.css"

const AccountForm = () => {
  const history = useHistory()

  const formik = useFormik({
    
    initialValues: {
      username: "", fullName: "", email: "",
      password: ""
    },

    onSubmit: values => {
      createAccount(values)
    }
  });

  async function createAccount(values) {
    const res = await fetch("/authentication", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.status === 400) {
      alert("algo correu mal")
    } else {
      const data = await res.json()
      history.push(`/profile/${data.createStatus.insertedId}`)
    }
  }
  return (

    <div className={styles.account}>
      <div className="formData">
        <form onSubmit={formik.handleSubmit}>
          <h1>Criar conta</h1>
          <div className={styles.inputs}>
            <label  htmlFor="username"></label>
            <input className={styles.label}
              id="username"
              name="username"
              type="username"
              placeholder="Nome de usuário"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="Nome"></label>
            <input className={styles.label} 
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Insira seu nome e apelido"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="email"></label>
            <input className={styles.label} 
              id="email"
              name="email"
              type="email"
              placeholder="exemplo@outlook.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>

          <div className={styles.inputs}>
            <label htmlFor="senha"></label>
            <input className={styles.label} 
              id="senha"
              type="password"
              name="password"
              placeholder="Insira uma senha"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>

          <button className={styles.button} type="submit">Criar conta</button>
        </form>
      </div>
    </div>

  );
};

export default AccountForm;