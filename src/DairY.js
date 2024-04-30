const mongoose=require("mongoose");
connect=mongoose.connect("mongodb://localhost:27017/credentials")
.then(()=>{
    console.log("database connected");
})
.catch(()=>{
    console.log("database not connected")
})
const ScriptSchema=new mongoose.Schema({
    date:{
        type: Date,
        required:true,
        default: Date.now,
    },
    day:{
        type:String,
        required:true
    },
    script:{
        type:String,
        required:true
    }
});
const collect = new mongoose.model("scripttext",ScriptSchema)
module.exports=collect






