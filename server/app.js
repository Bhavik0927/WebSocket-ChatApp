import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Connection } from './Database/db.js';
import User_Router from './Routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';


dotenv.config();
Connection();
    


const app = express();
// const server = createServer(app);


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// app.use(notFound);
// app.use(errorHandler)
// here cors is for websocket
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });


// these is middlwares for http requests like api's
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
))




app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/user", User_Router);

// io.on("connection", (socket) => {
//     console.log("a user connected...");
//     console.log("ID => " + socket.id);
    
//     socket.emit("welcome", "Welcome to Our server...!!");
// });


app.listen(process.env.PORT, () => {
    console.log(`App is listen on ${process.env.PORT}`);
});