import { z } from 'zod'

export const registerSchema = z.object({
    name: z
    .string({ message: "Name is mandatory "})
    .min(3, "Name must have more than 3 caracters"),
    email: z
    .email("Invalid password format"),
    password: z
    .string({message: "Password is mandatory"})
    .min(6, "Password must have 6 caracters")
})


export const loginSchema = z.object({
    email: z
    .email( "Invalid email format"),
    password: z 
    .string({message: "Password is mandatory"})
})

export type RegisterDTO = z.infer<typeof registerSchema>
export type LoginDTO = z.infer<typeof loginSchema>
{/*DDOS */}