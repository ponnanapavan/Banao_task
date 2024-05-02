import jwt from 'jsonwebtoken'

async function generateToken(userId,res)
{
    
          const token=jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:'15d',
          })
          console.log(token)
          res.setHeader('Set-Cookie', `jwttoken=${token}; HttpOnly; Max-Age=${15 * 24 * 60 * 60}; Path=/; SameSite=Strict`);
          
              return token
   
}

export default generateToken;