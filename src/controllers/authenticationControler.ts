import express from "express";
import { getUserByEmail , createUser,UserFormat } from "models/user.models";
import { passwordHashed,salt, createToken } from "helpers";
export const handleCreateuser = async(request: express.Request, response: express.Response) =>{
    try
    {
      const { email, password , username} = request.body
      if(!email || !password || !username)
        {
            return response.status(401).json({
                error : 'Please make sure you provide all data'
            })
        } 

        const checkUserEmailExist = await getUserByEmail(email)
        if(checkUserEmailExist)
            {
                return response.status(401).json({
                    error: 'User with this email Already found '
                })
            }

        const hashedpassword = passwordHashed(password)
        const token = createToken(password,email,hashedpassword)
         const userToregister: UserFormat = {
            username: username,
            email: email,
            authentication: { password: hashedpassword , salt: salt , sessionToken:token }
          }

        const registerMyUser = createUser(userToregister);
        
        if(!registerMyUser)
            {
                return response.status(401).json({
                    error: 'There was an error while trying to save user'
                })
            }

         return response.status(200).json({
            status: "success",
            user: registerMyUser
         })

    }catch(error) 
    {
      console.log(error.message)
      return response.status(403).json({
        error: error
      })
    }

}