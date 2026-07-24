import {Request, Response} from 'express'
import { AuthService } from '../services/auth.service'
import { RegisterDTO, LoginDTO, registerSchema, loginSchema } from '../schemas/auth.schema'
const authService = new AuthService()

export class AuthController {
   async register(req: Request, res: Response) {
    try {
      
      const validatedData = registerSchema.parse(req.body);

     
      const user = await authService.register(validatedData);

     
      return res.status(201).json({
        message: "Registered user",
        user,
      });

    } catch (error: any) {
      
      return res.status(400).json({
        error: error.errors ? error.errors[0].message : error.message,
      });
    }
  }
  async login(req: Request, res: Response){
    try {
        const validatedData = loginSchema.parse(req.body);
        const result = await authService.login(validatedData)
        return  res.status(200).json({
            message: "Successful login",
            ...result,
        })
    }catch(error: any){
        return res.status(400).json({
            message: "Incorrect informations"
        })
    }

  }
}