import express from "express"
import getallItems from "./routes/item.routes.js"

const app = express()

app.use(express.json())
app.use(getallItems)

app.get('/',(req,res)=>{
    res.json({
        status:"ok",
        uptime: process.uptime()
    })
})

export default app