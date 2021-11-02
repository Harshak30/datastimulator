var express = require('express');
var app = express.Router();
var User=require('../database');

app.post('/user',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e.message)
    }
});

app.get('/size/type/user',async(req,res)=>{
    try{
        const s=req.query.size;
        const user=await User.find({}).limit(Number(s))
        if(!user)
        return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
});

app.get('/company/type/user',async(req,res)=>{
    //console.log(req.params);
    try{
        var name = req.query.company;
        const user=await User.find({company:name});
        if(!user)
        return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
});


app.get('/dob/type/user',async(req,res)=>{
    //console.log(req.params);
    try{
        var d = req.query.dob;
        const user=await User.find({dob:d});
        if(!user)
        return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
});


app.get('/page/type/user', async (req, res) => {
    const { company='foxsense', offset = 1, limit =2  } = req.query;
    try {
      const pages = await User.find({company:company})
        .limit(limit*1)
        .skip(offset*1)
        .exec();
      const count = await User.countDocuments();
      //var count = Object.keys(pages).length;
      res.json({
        pages,
        totalPages: Math.ceil(count / limit),
        totalcount: count
      });
    } catch (e) {
        res.status(500).send(e.message);
    }
  });

app.delete("/type/user", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.query);
      if (!user) res.status(404).send("Not found");
      res.status(200).send();
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  
module.exports = app;