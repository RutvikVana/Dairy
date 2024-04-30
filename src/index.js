const express=require("express");
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const collect =require("./DairY");
const app= express();
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs");
app.get("/",(req,res) =>{
    res.render("signup");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/signup",async(req, res)=>{
    const data={
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("user already exists. choose a different username.")

    }else{
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPassword;
        
    const infos = await collection.insertMany(data)
    console.log(infos);
    
    }
    res.render("login")
})
app.post("/login",async(req,res)=>{
    try{
        const check =  await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name not found");
        
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(! isPasswordMatch){
            res.send("wrong password");
        }else{
            res.render("home");
        }
        }catch{
            res.send("Wrong Details");
        }
    
})
app.post("/home",async(req,res)=>{
    const dat ={
        date: req.body.date,
        day: req.body.day,
        script: req.body.script
    }
    const scripts = await  collect.insertMany(dat);
    console.log(scripts);
})
app.get('/search',async (req, res) => {
    try{
        const checkk = await collect.find({name: req.body.date});
        if(!checkk){
            res.send("date not found");
        
        }
        else{
            
            res.send(checkk);
        }
    }catch{
            res.send("Error");
        }
    

    
});
app.listen(3000,()=>{
    console.log("server running");
})