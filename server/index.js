import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./utils/connectDb.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.route.js"
import pdfRouter from "./routes/pdfDownload.js"
import creditRouter from "./routes/credits.route.js"
import {stripeWebhook} from "./controllers/credits.controller.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"
const PORT = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === "production"

app.post(
    "/api/credits/webhook",
    express.raw({type: "application/json"}),
    stripeWebhook
);

app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
}))

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
 res.json({message:"ExamNotes AI Backend Running "})
})
app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit", creditRouter)

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../client/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  })
}

app.listen(PORT, async () => {
    await connectDb()
    console.log(`Server running on port ${PORT} ✅`)
})