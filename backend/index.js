const express = require("express");
const PORT = 3101;
const app = express();
const { v4: uuidv4 } = require('uuid')
app.use(express.json())
const {
  getloginInfo,
  createUser,
  getUserById,
  togglePrivateStatus,
  updateUserProfile,
  getAllAds,
  insertAdvertising,
  getUserByUsername
} = require("./helperMongo")
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


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

//obtem a toda a info do utilizador a partir do id
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

//obtem a toda a info do utilizador a partir do username
app.get("/users/name/:username", async (req, res) => {
  try {
    const newUsername = req.params.username.replace(/-/g, ' ')
    const user = await getUserByUsername(newUsername)
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
app.patch("/authentication/:id", upload.single('photo'), async (req, res) => {
  try {
    const userInfo = JSON.parse(req.body.all)

    const idPhoto = uuidv4()
    const uploadedPhotoPath = path.join(__dirname, req.file.path);
    const relativePath = '/photos/' + idPhoto
    userInfo.path = relativePath
    const photoPath = path.join(__dirname, relativePath);
    const dirPath = path.join(__dirname, 'photos')
    const mongoAnswer = await updateUserProfile(req.params.id, userInfo)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    fs.renameSync(uploadedPhotoPath, photoPath)
    if (mongoAnswer.modifiedCount === 1) {
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    console.log(error)
  }
})

//carrega a foto
app.get("/photo/:username/", async (req, res) => {
  try {
    console.log("sasf'0ans8f")
      const username = req.params.username.replace(/-/g, ' ')
      let user = await getUserByUsername(username)
      console.log(user)
      res.sendFile(user[0].path, { root: __dirname })
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

//carrega os anuncios da pagina inicial
app.get("/homepage", async (req, res) => {
  try {
    const adsArray = await getAllAds()
    res.status(200).json({ adsArray })
  } catch (error) {
    console.log(error)
  }
})

//pesquisa na pagina inicial
////////////////////////////////////////
app.get("/search", async (req, res) => {
  try {
    console.log(req.query.q)
  } catch (error) {
    console.log(error)
  }
})

app.post("/advertising", async (req, res) => { //api que recebe do frontend o anuncio para criação na base de dados
  try {
    const id = await insertAdvertising(req.body)
    res.status(200).json({ id })
  } catch (error) {
    console.log(error)
  }
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

