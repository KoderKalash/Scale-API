import express from "express"

const app = express()

app.get('/',(req,res)=>{
    res.json({
        status:"ok",
        uptime: process.uptime()
    })
})

export default app