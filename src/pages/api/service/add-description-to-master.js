import MasterService from "@/models/admin/ServicesModel/MasterService";

const addDescriptionApiToMaster=async (req,res)=>{
    try {
        const {description,serviceId}=req.body;
        if(!serviceId){
            return res.status(400).json({message:"ServiceId is required"});
        }
        if(req.method==="POST"){
          
            const resdata=await MasterService.findByIdAndUpdate(serviceId,{$set:{description}});

            if(!resdata){
                return res.status(400).json({message:"Something went wrong"});
            }

            return res.status(200).json({message:"Service is Updated By description"});
        }
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

export default addDescriptionApiToMaster