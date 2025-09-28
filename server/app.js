import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const app = express();
const server = createServer(app);

// here cors is for websocket
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});


// these is middlwares for http requests like api's
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
))


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});


io.on("connection", (socket) => {
    console.log("a user connected...");
    console.log("ID => " + socket.id);
    
    socket.emit("welcome", "Welcome to Our server...!!");
});


server.listen(PORT, () => {
    console.log(`App is listen on ${PORT}`);
});