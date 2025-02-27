
import UserAdmin from "@/models/admin/UserAdmin";
import dbConnect from "@/utils/db";
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const {username,currentPassword,newPassword}=req.body;
      if (!username || !currentPassword||!newPassword) {
        return res.status(400).json({ error: 'Username,currentPassword and password are required' });
      }
       const user=await UserAdmin.findOne({username})
       if(!user){
        return res.status(400).json({message:"User not found"});
       }

       if(await bcrypt.compare(currentPassword, user.password)){
        const saltRounds = 10; // Adjust for security vs. performance
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password=hashedPassword;
        user.save()
       }
    
        return res.json({ message: 'Password Changed successfully' });
      } catch (error) {
        console.error("Logout error:", error);
        return res.status(501).json({ error: "Invalid or expired refresh token" });
      }
   
  }
  else{
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

 
}
