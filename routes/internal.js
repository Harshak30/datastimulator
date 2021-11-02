var express = require('express');
var app = express.Router();
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://HarshaK:x1LpiWBEqJZlTIug@cluster0.2s17q.mongodb.net/datastimulator?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true});
const Schema=mongoose.Schema
const db=mongoose.connection
app.post('/schema/type/user',async(req,res)=>{
    var tname=req.query.tablename
    var val=req.body
    //console.log(tname)
    try{
        const schema = new Schema(val)
        const sample = mongoose.model(tname,schema);
        res.status(201).send(sample);
    }catch(e){
        res.status(400).send(e.message)
    }
});



app.delete("/schema/type/user", async (req, res) => {
    var tname=req.query.tablename
    try {
      db.dropCollection(tname);
      res.status(200).send('deleted');
    } catch (e) {
      res.status(500).send(e.message);
    }
});

app.get('/schema/type/user',async(req,res)=>{
    try{
        const names=db.db.listCollections()
        res.status(201).send(names)
    }catch(e){
        res.status(400).send(e.message)
    }
});

module.exports = app;