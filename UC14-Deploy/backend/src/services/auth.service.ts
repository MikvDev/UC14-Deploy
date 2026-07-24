import { AppDataSource } from "../config/data-source.js";
import { User } from "../models/User.js";
import { RegisterDTO, LoginDTO } from "../schemas/auth.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class  AuthService {
    private userRepository = AppDataSource.getRepository(User)
    async register(data:  RegisterDTO){
        const userExist  = await this.userRepository.findOneBy({email: data.email   })
        if(userExist) throw new Error("Email already registered")
        const hashedPWD =  await bcrypt.hash(data.password, 10);
        const newUser  = this.userRepository.create({
            name: data.name,
            email: data.email,
            password: data.password
        })
        await this.userRepository.save(newUser)
        const  {password, ...UserWithoutPWD } = newUser;
        return UserWithoutPWD   
    }
    async login(data: LoginDTO){
        const user = await this.userRepository.findOneBy({email: data.email})
        if(!user) throw new Error("Email or Password are incorrect");

        const isValidPWD = await bcrypt.compare(data.password, user.password)
        if(!isValidPWD) throw new Error("Email or Passwprd are incorrect");
        const secret = process.env.JWT_SECRET || "default_secret"
        const token  = jwt.sign({id: user.id}, secret, {expiresIn: "1d"}); 
        const {password, ...UserWithoutPWD} = user;           
        return {user: UserWithoutPWD, token}
    }
}