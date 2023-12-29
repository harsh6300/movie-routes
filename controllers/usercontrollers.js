const { name } = require("ejs");
const path = require('path')
const fs = require('fs');

const usercontrol = require('../models/crud');
const index = (req,res)=>{
    return res.render('index');
}
const view = async(req,res) =>{
    try{
        let record  = await usercontrol.find({});
       
       return res.render('view',{record})
    }catch(err){
        console.log(err);
        return false;
    }
}
const add = async(req,res)=>{
   
   try{
    

        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
    
       let all = await usercontrol.create({
        name,description,price,images : req.file.path
       })
       return res.redirect('/');


   }catch(err){
        console.log(err);
        return false;
   }
}


const deleterecord = async(req,res)=>{
    try{
        let id = req.query.id

        let record = await usercontrol.findById(id)
          fs.unlinkSync(record.images)

        let all = await usercontrol.findByIdAndDelete(id)
        return res.redirect('/view');

    }catch(err){
        console.log(err);
        return false;
    }
}
const editrecord = async(req,res) =>{
    try{
        let record = await usercontrol.findById(req.query.id);

        return res.render('edit',{
            record
       })

    }catch(err){
        console.log(err);
        return false
    }
}

const update = async(req,res) =>{
     let id = req.body.id;
     try{

     
    if(req.file){
        //old image replace in folder
        let oldrecord = await usercontrol.findById(id)
            
                fs.unlinkSync(oldrecord.images);
           
        

        //new iamges
        

        //edit data
        let use = await usercontrol.findByIdAndUpdate(id,{
            name : req.body.name,
           description : req.body.description,
           price : req.body.price,
            images : req.file.path
        })
             return res.redirect('/view');
       
    }else{
        //edit data
        let all = await usercontrol.findById(id)
       
            
         let record = await   usercontrol.findByIdAndUpdate(id,{
                name : req.body.name,
           description : req.body.description,
           price : req.body.price,
            images : req.body.images
            })
              return res.redirect('/view');
           
       
    }
}catch(err){
    console.log(err);
    return false;
}
}

module.exports={
    index,view,add,deleterecord,editrecord,update
}