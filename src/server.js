import dotenv from "dotenv"
import dbConnect from "./config/db.js"
import app from "./app.js"

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
    await dbConnect();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer()