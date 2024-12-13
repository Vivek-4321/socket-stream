const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static files (like CSS or client-side JS, if you had any)
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => {
    res.render('stream');
});

app.get('/view', (req, res) => {
    res.render('view');
});


// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
   socket.on('stream-video-chunk', (data) => {
      console.log("Server received stream chunk from:", socket.id);
            socket.broadcast.emit('stream-video-chunk',data)
         });


    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});


// Start server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});