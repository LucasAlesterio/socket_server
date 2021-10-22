import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
    // socket.broadcast.emit("hi");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/send", (req: Request, res: Response) => {
    io.emit("chat message", "Hello World");
    res.send("Message sent");
});

server.listen(port, () => {
    console.log(`🔥 Server running in http://localhost:${port} 🔥`);
});
