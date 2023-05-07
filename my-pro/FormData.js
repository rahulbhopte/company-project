const mongoose=require('mongoose')
const formSchema= new mongoose.Schema({
    name:String,
    age:String,
    sex:String,
    phone:String,
    address:String,
    govtIdType:String,
    govtId:String,
    guardian:String,
    guardianName:String,
    nationality:String
})
module.exports=mongoose.model('formdata',formSchema)