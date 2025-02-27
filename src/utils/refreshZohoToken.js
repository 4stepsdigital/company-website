export const refreshAccessToken = async () => {
    const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
    const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
    const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
    const url = "https://accounts.zoho.in/oauth/v2/token";
    const params = new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    });
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
  
      const data = await response.json();
      if (data?.access_token) {
         const ZOHO_ACCESS_TOKEN = data?.access_token;
        return ZOHO_ACCESS_TOKEN
      } else {
       return null
      }
    } catch (error) {
      console.error(" Error refreshing token:", error);
      return null
    }
  };