
import 'reflect-metadata'
import express from 'express'
import { DataSource } from 'typeorm'
import { User } from './entities/User'

const app = express()

app.use(express.json())

const PORT = 8000

app.get('/', function(req,res) {
    res.send("Service Up!")
})

app.get('/users', async function(req,res) {
    const users = await AppDataSource.getRepository(User).find()
    res.status(200).json(users)

})

app.get('/user-by-id', async function(req,res) {
    const filteredUser = await AppDataSource.getRepository(User).findOne({where:{id:1}})
    res.status(200).json(filteredUser)

})

app.get('/create-user', async function(req,res) {
    const user : User = new User();
    user.email = "abc@gmail.com"
    user.firstName = "abc"
    user.lastName = "xyz"
    const addedUser = await AppDataSource.getRepository(User).save(user)
    res.status(200).json(addedUser)

})

app.get('/update-user', async function(req,res) {
    const user : User = new User();
    user.firstName = "abc_updated"
    user.lastName = "xyz"
    const updatedUser = await AppDataSource.getRepository(User).update(1,user)
    res.status(200).json(updatedUser)

})

app.get('/delete-user', async function(req,res) {
    const deletedStatus = await AppDataSource.getRepository(User).delete(2)
    res.status(200).json(deletedStatus)

})

const AppDataSource = new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432, // should be in .env file
    username:'postgres', // should be in .env file
    password: 'postgres', // should be in .env file
    database:'typeorm_db', // should be in .env file
    entities:["src/entities/*{.ts,.js}"],
    synchronize:true, 
    logging:true,
})

AppDataSource.initialize().then(()=>{
    app.listen(PORT,()=>{
        console.log("Running")
    })
}).catch(err=>{console.log(err)})



