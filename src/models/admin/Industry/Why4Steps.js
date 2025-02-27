const { default: mongoose } = require("mongoose");
const miniSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})
const why4stepsSchema=new mongoose.Schema({

    heading:{
        type:String,
        required:true
    },
    partnersData:[String],
    overviewData:[miniSchema],
    industry:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Industry1",
        required:true
    }


},{timestamps:true});

const Why4Steps=mongoose.models.Why4Steps||mongoose.model("Why4Steps",why4stepsSchema);
export default Why4Steps;