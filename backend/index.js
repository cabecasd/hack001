const express = require("express");
const PORT = 3101;
const app = express();
app.use(express.json())
const {
  getloginInfo,
  createUser,
  getUserById,
  togglePrivateStatus,
  updateUserProfile
} = require("./helperMongo")


//criar conta
app.post("/authentication", async (req, res) => {
  try {
    console.log("entrei")
    const createStatus = await createUser(req.body)
    //se o status for true e porque o usuario ainda nao existe na base de dados, logo cria conta
    if (createStatus) {
      res.status(200).json({
        createStatus
      })
      //senao informa o usuario que o username ja esta em uso
    } else { res.sendStatus(400) }

  } catch (error) {
    console.log(error)
  }
})

//login
app.patch("/authentication", async (req, res) => {
  try {
    const loginInfo = await getloginInfo(req.body)
    if (loginInfo) {
      res.status(200).json({
        loginInfo
      })
    } else { res.sendStatus(404) }
  } catch (error) {
    console.log(error)
  }
})

//obtem a toda a info do utilizador
app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    if (user.length > 0) {
      res.status(200).json({ user: user[0] })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
  }
})

//guarda alteracoes ao perfil do utilizador
app.patch("/authentication/:id", async (req, res) => {
  try {
    const mongoAnswer = await updateUserProfile(req.params.id, req.body)
  } catch (error) {
    console.log(error)
  }
})

//toggle à privacidade do perfil
app.patch("/togglePrivate", async (req, res) => {
  try {
    await togglePrivateStatus(req.body.id, req.body.privateState)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

//pesquisa na pagina inicial
////////////////////////////////////////
app.get("/search", async (req, res) => {
  try {
    console.log(req.query.q)
    console.log("fasadfa")
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

