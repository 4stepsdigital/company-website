import * as jose from 'jose'
export const generateAccessToken = async (user) => {
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
  
  const token = await new jose.SignJWT({id:user})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')  // 20 minutes
    .sign(secret)
    
  return token
};

export const generateRefreshToken = async (user) => {

  const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
  
  const token = await new jose.SignJWT({id:user})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')  // 7
    .sign(secret)
    
  return token
};
export async function verifyAccessToken(token) {
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

  try {
    const { payload } = await jose.jwtVerify(token, secret)
    return payload
  } catch (error) {
    // Check specific error types
    if (error.code === 'ERR_JWT_EXPIRED') {
      return null
    }
    if (error.code === 'ERR_JWS_INVALID') {
      return null
    }
    // Generic error handling
    return null
  }
}

// Verify Refresh Token
export async function verifyRefreshToken(token) {
  const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
  try {
    const { payload } = await jose.jwtVerify(token, secret)
    return payload
  } catch (error) {
    // Check specific error types
    if (error.code === 'ERR_JWT_EXPIRED') {
     
      return null
    }
    if (error.code === 'ERR_JWS_INVALID') {
      
      return null
    }
    return null
  }
}