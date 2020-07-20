const express=require('express')

const router=express.Router()

const mongo=require('mongodb')

const uri='mongodb://localhost:27017/barkposts'

router.get("/getposts",(req,res) =>{
    mongo.connect(uri,(err,db)=>{
        if(err){
            throw err
        }

        const getDb=db.db("barkposts")
        getDb.collection('posts').find().toArray((err,result) =>{
            if(err)
            {
                throw console.error();
                
            }

            res.json({
                message:"Data fetched",
                Allposts:result
            })
        })
    })
})





router.post('/addposts',(req,res) =>{
    const postObj={
        title:req.body.title,
        body:req.body.body
    }
    mongo.connect(uri,(err,db) =>{
        if(err){
            throw err
        }

        const postDb=db.db('barkposts')

        postDb.collection('posts').insertOne(postObj,(err,result)=>
        {
            if(err)
            {
                throw err
            }

            res.json({
                message:"DataSaved",
                Allposts:result
            })
        })

    })
})


router.put('/updatepost',(req,res) =>{

    const id=req.body.id
    const updateObj={
        $set:{
            title:req.body.title,        
            body:req.body.body
        }
    }

    mongo.connect(uri,(err,db)=>{
        if(err){
            throw err
        }
        const updateDb=db.db('barkposts')
        ObjectID=mongo.ObjectID
        updateDb.collection('posts').updateOne({_id:ObjectID(id)},updateObj,(err,result) =>{
        
            if(err){
                throw err
            }

            res.status(200).json({
                
                message:"Data Updated",
                Allposts:result
            })
        })
    })
})

router.delete('/deletepost',(req,res) =>{
    const id=req.body.id
    mongo.connect(uri,(err,db)=>{
        if(err){
            throw err
        }
        const updateDb=db.db('barkposts')
        ObjectID=mongo.ObjectID
        updateDb.collection('posts').deleteOne({_id:ObjectID(id)},(err,result) =>{
        
            if(err){
                throw err
            }

            res.status(200).json({
                
                message:"Data Deleted",
                Allposts:result
            })
        })
    })
})



module.exports=router