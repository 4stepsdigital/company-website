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
    technology:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TechnologyHero",
        required:true
    }


},{timestamps:true});

const Why4StepsTech=mongoose.models.Why4StepsTech||mongoose.model("Why4StepsTech",why4stepsSchema);
export default Why4StepsTech;