const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Store active users and their locations
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room for a specific order ID
  socket.on('order:join', (orderId) => {
    const room = `order:${orderId}`;
    socket.join(room);
    socket.emit('order:joined', { orderId });
  });

  // Rider streams location
  socket.on('rider:location', (payload) => {
    const { orderId, lat, lng, accuracy, heading, speed, timestamp } = payload || {};
    if (!orderId || typeof lat !== 'number' || typeof lng !== 'number') return;
    const room = `order:${orderId}`;
    // Broadcast to everyone tracking this order, including the rider (for confirmation)
    io.to(room).emit('location:update', {
      orderId,
      lat,
      lng,
      accuracy: accuracy ?? null,
      heading: heading ?? null,
      speed: speed ?? null,
      timestamp: timestamp ?? Date.now(),
    });
  });

  // Handle real-time location updates for live tracking
  socket.on('locationUpdate', (locationData) => {
    const { id, lat, lon, timestamp } = locationData;
    
    // Validate the data
    if (!id || typeof lat !== 'number' || typeof lon !== 'number') {
      console.log('Invalid location data received:', locationData);
      return;
    }

    // Store the user's location
    activeUsers.set(id, {
      id,
      lat,
      lon,
      timestamp: timestamp || Date.now(),
      socketId: socket.id
    });

    console.log(`Location update from user ${id}: ${lat}, ${lon}`);

    // Broadcast the location update to all connected clients
    socket.broadcast.emit('locationUpdate', {
      id,
      lat,
      lon,
      timestamp: timestamp || Date.now()
    });
  });

  // Send current active users to newly connected client
  socket.on('requestActiveUsers', () => {
    const users = Array.from(activeUsers.values());
    socket.emit('activeUsers', users);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Remove user from active users when they disconnect
    for (const [userId, userData] of activeUsers.entries()) {
      if (userData.socketId === socket.id) {
        activeUsers.delete(userId);
        // Notify other clients that this user disconnected
        socket.broadcast.emit('userDisconnected', userId);
        console.log(`Removed user ${userId} from active users`);
        break;
      }
    }
  });
});

// Clean up inactive users every 30 seconds
setInterval(() => {
  const now = Date.now();
  const thirtySecondsAgo = now - 30000;
  
  for (const [userId, userData] of activeUsers.entries()) {
    if (userData.timestamp < thirtySecondsAgo) {
      activeUsers.delete(userId);
      console.log(`Removed inactive user: ${userId}`);
    }
  }
}, 30000);

const PORT = process.env.SOCKET_PORT || 4001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
