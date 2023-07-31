import express from 'express'

const app = express()

app.use(express.json())

const Port = 8000

app.get('/', function(req,res) {
    res.send("Hello")
})

app.listen(Port,()=>{
    console.log("Running:")
})