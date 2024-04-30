const mongoose=require("mongoose");
connect=mongoose.connect("mongodb://localhost:27017/credentials")
.then(()=>{
    console.log("database connected");
})
.catch(()=>{
    console.log("database not connected")
})
const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
    
});
const collection =new mongoose.model("info",LogInSchema)
module.exports=collection;
