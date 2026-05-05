import "dotenv/config"
import app from "./app"

app.listen(3000, () => {
    console.log(process.env.DATABASE_URL)
  console.log("🚀 Server running on http://localhost:3000")
})