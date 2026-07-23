import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { AppDataSource } from './src/config/data-source'
import { authRoutes } from './src/routes/auth.routes'

dotenv.config()

const app = express()

// 1. Configuração do CORS (deve vir ANTES das rotas)
app.use(cors({
    origin: "http://localhost:5173", // Ajustado para HTTP
    credentials: true
}))

// 2. Middlewares de Parser (devem vir ANTES das rotas)
app.use(express.json()) // Adicionado os parênteses ()
app.use(cookieParser())

// 3. Rotas da API
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000

// 4. Inicialização do Banco e do Servidor
AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!")
        
        // Passamos a variável PORT aqui
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`)
        })
    })
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error))