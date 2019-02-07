const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const port = 3333
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const loginController = require("./controllers/login")
const itemsController = require("./controllers/items")

app.use("/login", loginController)
app.use("/item", itemsController)

app.use((err, req, res, next) => {
	res.status(500).json({ error: err })
})

app.listen(port, () => {
	console.log(`server is running on port ${port}`)
})
