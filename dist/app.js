"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
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
app.get("/", (req, res) => {
    res.sendFile(__dirname + (process.env.TS_NODE ? "/index.html" : "../index.html"));
});
app.get("/send", (req, res) => {
    io.emit("chat message", "Hello World");
    res.send("Message sent");
});
server.listen(port, () => {
    console.log(`🔥 Server running in http://localhost:${port} 🔥`);
});
//# sourceMappingURL=app.js.map