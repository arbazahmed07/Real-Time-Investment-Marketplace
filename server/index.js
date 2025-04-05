const express = require('express')
const app = express()
const port = process.env.PORT || 4000;


const { Server } = require("socket.io");
const http = require("http");

const cookieParse=require('cookie-parser')
const cors = require('cors');
const userRouter=require('./routers/userRouter')
const investorRouter = require('./routers/investorRouter')
const startupRouter = require("./routers/startupRouter");
const notificationRouter = require("./routers/notificationRouter");
const messageRouter = require("./routers/messageRouter");

app.use(cors());
app.use(express.json());
app.use(cookieParse());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Keep track of online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected: ${socket.id}`);
  
  // Handle user connected
  socket.on("user_connected", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.broadcast.emit("user_status", { userId, status: "online" });
  });

  socket.on("send_notification", (data) => {
      socket.broadcast.emit("receive_notification", data);
  });

  // Enhanced chat message handler
  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    
    // If receiver is online, send directly to their socket
    const receiverSocketId = onlineUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", data);
    } else {
      // If not online, broadcast to all (the client will filter)
      socket.broadcast.emit("receive_message", data);
    }
  });
  
  socket.on("disconnect", () => {
    // Find and remove the disconnected user
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        socket.broadcast.emit("user_status", { userId, status: "offline" });
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

app.use('/users',userRouter);
app.use('/investors', investorRouter);
app.use("/startups", startupRouter);
app.use("/notification", notificationRouter);
app.use("/messages", messageRouter);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
