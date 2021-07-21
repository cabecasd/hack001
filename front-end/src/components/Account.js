import React from "react";
import { useFormik } from "formik";

const AccountForm = () => {


    const formik = useFormik({
      initialValues: { username: "", fullName: "", email: "", 
       password: ""}, 

      onSubmit: values => {
        fetch("/api/user", {
          method: "POST",
          body: alert(JSON.stringify(values, null, 2)),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => res.json())
        .then(() => window.location.href = "/")
      }

    });
    return (
    
          <div className="form">
            <div className="formData">
              <form onSubmit={formik.handleSubmit}>
                <h1>Criar conta</h1>
                <div className="inputs">
                  <label className='label' htmlFor="username">Usuário</label>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    placeholder="Nome de usuário"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </div>
                <div className="inputs">
                  <label className='label' htmlFor="Nome">Nome completo</label>
                  <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Insira seu nome e apelido"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  />
                </div>
                <div className="inputs">
                  <label className='label' htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemplo@outlook.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>

                <div className="inputs">
                  <label className='label'htmlFor="senha">Senha</label>
                  <input
                  id="senha"
                  type="password"
                  name="password"
                  placeholder="Insira uma senha"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  />
                </div>

                <button  className="createAcBtn" type="submit">Criar conta</button>
              </form>
            </div>
          </div>        
     
    );
};

function CreateAccount() {
    return <AccountForm />;
}

export default Account;