const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { apiRouter } = require("./routes/api.route")

require("dotenv").config();

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api", apiRouter)


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port} & is Connected to Database`)
    } catch (error) {
        console.log(error.message)
    }
})