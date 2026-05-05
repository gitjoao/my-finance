import express from "express"
import transactionRoutes from "./modules/transactions/transaction.route"

const app = express()

app.use(express.json())
app.use("/transactions", transactionRoutes)

export default app