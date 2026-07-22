import {Router} from 'express'
import { AuthController } from '../controllers/auth.controller'
import { registerSchema } from '../schemas/auth.schema';
const  authRoutes = Router()
const authController = new  AuthController();
authRoutes.post('./login', (req, res) => authController.login)
authRoutes.post('./register ', (req, res) => authController.register)
export {authRoutes}