const express=require('express')
const md5=require('md5')
const jwt=require('jsonwebtoken')

const router=express.Router()

const mongo=require('mongodb')

const uri='mongodb://localhost:27017/barkposts'

router.post('/register',(req,res) =>{
    const registerObj={
        name:req.body.name,
        email:req.body.email,
        password:md5(req.body.password),

    }
    mongo.connect(uri,(err,db) =>{
        if(err){
            throw err
        }

        const postDb=db.db('users')

        postDb.collection('users').insertOne(registerObj,(err,result)=>
        {
            if(err)
            {
                throw err
                
                
            }

            res.json({
                message:"registered successfully",
                users:result
            })
        })

    })
})

router.post('/login',(req,res) =>{
    const userData=req.body
     
    mongo.connect(uri,(err,db) =>{
        if(err){
            throw err
        }

        const postDb=db.db('users')

        postDb.collection('users').findOne({email:userData.email},(err,result)=>
        {
                if(err)
                {
                    res.json({
                        message:"Invalid login Id or password",
                        users:[],
                        token:''
                    })
                }
                else{
                    if(result!=null){
                        if(result.password==md5(userData.password))
                        {
                            const token=jwt.sign({userName:result.name,id:result._id},"#ufhyoru029493ir5")
                            res.json({
                                message:"logged  in successfully",
                                users:{userName:result.name,id:result._id},
                                token:token
                            })
        
                        }else{
                            res.json({
                                message:"Invalid login Id or password",
                                users:[],
                                token:''
                            })
                        }
                    }
                }
        })

    })
})





module.exports=router