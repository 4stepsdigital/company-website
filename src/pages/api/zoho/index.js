import { refreshAccessToken } from "@/utils/refreshZohoToken";
const sendDataToZohoFromFrontend=async (req,res)=>{
let ZOHO_ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN;
    const url = "https://www.zohoapis.in/crm/v2/Leads";
if(req.method!=="POST"){
    return res.status(400).json("method is not allowed")
}
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [req.body], trigger: ["workflow"] }),
    });

    if (response.status === 401) {
      console.log("Token Expired! Refreshing...");
      ZOHO_ACCESS_TOKEN= await refreshAccessToken(); // Get new token
      response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [req.body], trigger: ["workflow"] }),
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default sendDataToZohoFromFrontend
