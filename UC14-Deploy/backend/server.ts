import express  from 'express'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import dotenv  from  'dotenv'
import {AppDataSource} from './src/config/data-source'
import {authRoutes} from './src/routes/auth.routes'
dotenv.config()
const app = express()
app.use('/api/auth', authRoutes)
app.use(express.json)
app.use(cookieParse())
app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}))

const  PORT = process.env.PORT || 3000
AppDataSource.initialize()
.then(() => {console.log("Servidor Conectado com Sucesso")
app.listen(() => {
    console.log("Servidor rodando!")
})
}).catch((error) => console.error("Erro ao conectar ao banco"))
