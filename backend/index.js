const express = require("express");
const PORT = 3101;
const app = express();
app.use(express.json())
const {
  getloginInfo,
  createUser
} = require("./helperMongo")

app.post("/authentication", async (req, res) => {
  try {
    const createStatus = await createUser(req.body.values)
    //se o status for true e porque o usuario ainda nao existe na base de dados, logo cria conta
    if (createStatus) {
      res.sendStatus(200)
      //senao informa o usuario que o username ja esta em uso
    } else { res.sendStatus(400) }

  } catch (error) {
    console.log(error)
  }
})

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});