import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
const app = express();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
io.on("connection", (socket) => {
    var roomName = "";
    console.log("A user connected");
    console.log(socket.rooms);
    socket.on("create", function (room) {
        roomName = room;
        console.log("Create Room: " + room);
        socket.join(room);
    });
    socket.on("rele", (msg) => {
        console.log("message: ");
        console.log(msg);
        io.to(roomName).emit("rele", msg);
    });
    socket.on("led", (msg) => {
        console.log(roomName);
        console.log("message: ");
        console.log(msg);
        io.to(roomName).emit("led", msg);
    });
    socket.on("tempRequest", (msg) => {
        console.log("tempRequest: ");
        console.log(msg);
        io.to(roomName).emit("tempRequest", msg);
    });
    socket.on("temp", (msg) => {
        console.log("temp: ");
        console.log(msg);
        io.to(roomName).emit("temp", msg);
    });
    socket.on("servo", (msg) => {
        console.log("servo: ");
        console.log(msg);
        io.to(roomName).emit("servo", msg);
    });
    // socket.broadcast.emit("hi");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(port, () => {
    console.log(`🔥 Server running in http://localhost:${port} 🔥`);
});
