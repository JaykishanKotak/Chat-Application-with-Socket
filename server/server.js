const express = require('express');
const http = require('http');
const {
  Server
} = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

//Rooms Code
const rooms = {}
app.get('/', (req, res) => {
  res.render('index', {
    rooms: rooms
  })
})

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = {
    users: {}
  }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', {
    roomName: req.params.room
  })
})


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', "POST"]
  }
});


io.on('connection', (socket) => {
  console.log(`user ${socket.id} is connected.`)

  //socket.join("room1");
  //socket.to("room1").emit("some event");
  //Room Code
  socket.on('room', (room) => {
    socket.join(room);
  });
  //room = "abc123";
  socket.on("memberConnected", (room) => {
    socket.to(room).emit('message', 'hello world');
  })

  socket.on('message', data => {
    socket.broadcast.emit('message:received', data)
  })

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} left.`)
  })
})

server.listen(3000, () => {
  console.log('Chat server is running on 3000')
})