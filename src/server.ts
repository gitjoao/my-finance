import 'dotenv/config'
import app from './app'

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, "0.0.0.0", () => console.log(`Running on ${PORT}`));
