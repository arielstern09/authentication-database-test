const express = require("express")
const app = express()
const logger = require("morgan")
const connectToMongoDB = require("./database/connectToMongoDB")

const PORT = 3000;

app.use(logger("dev"));
app.use(express.json())

const userRouter = require("./router/userRouter")

app.use("/api/users/", userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectToMongoDB()
})
