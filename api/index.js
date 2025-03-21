import express from "express";
import authRoutes from "./routes/auth.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
  }));
//middlewares
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/users",userRoutes)


app.listen(8800,()=>{
    console.log("Api is working");
})