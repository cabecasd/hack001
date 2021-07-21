const express = require("express");
const PORT = 3101;
const app = express();
app.use(express.json())
const {
  getLoginStatus
} = require("./helperMongo")

app.patch("/authentication", async(req, res) => {
  try {
    const loginStatus = await getLoginStatus(req.body.values)
    console.log(loginStatus)

  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});