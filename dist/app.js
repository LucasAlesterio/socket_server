"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
//# sourceMappingURL=app.js.map