import express from 'express'
import cors from 'cors'
import routes from './routes'
import cookieParser from 'cookie-parser'

const app = express()

app.set("trust proxy", 1)
app.use(cors({
  origin: [process.env.FRONTEND_URL!, "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(cookieParser())

app.use(routes)

export default app
