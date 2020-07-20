const express=require('express')

const bodyParser=require('body-parser')

const post_api=require('./routes/postApi')
const user_api=require('./routes/users')




const router=express.Router()

const app=express()

const port=3000

app.use(bodyParser.json())

app.use("/",(req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-type')
    next()
})

app.use('/barkposts',post_api)
app.use('/barkposts',user_api)


app.listen(port)
