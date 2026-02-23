# 🗺️ Real-Time Location Tracking with Leaflet & Socket.IO

This implementation provides real-time location tracking and sharing using Leaflet maps, React-Leaflet, and Socket.IO.

## 📦 Installation

All required packages have been installed:

```bash
npm install leaflet react-leaflet socket.io socket.io-client @types/leaflet concurrently
```

## 🚀 Running the Application

### Option 1: Run both servers simultaneously
```bash
npm run dev:all
```

### Option 2: Run servers separately

**Terminal 1 - Next.js App:**
```bash
npm run dev
```

**Terminal 2 - Socket.IO Server:**
```bash
npm run socket
```

## 📁 File Structure

```
src/
├── components/
│   └── Map.tsx                 # Main map component with real-time tracking
├── app/
│   ├── page.tsx               # Updated main page with map integration
│   └── api/
│       └── location/
│           └── route.ts       # API route for location storage
server/
└── socket.js                  # Socket.IO server (updated)
```

## 🔧 Key Features Implemented

### 1. **Map Component** (`src/components/Map.tsx`)
- ✅ Uses browser Geolocation API with `watchPosition` for continuous tracking
- ✅ Displays user location on Leaflet map with custom blue marker
- ✅ Fixed Leaflet default marker icon issue in Next.js
- ✅ Shows "You are here 🚶‍♂️" popup for current user
- ✅ Full width/height map display
- ✅ Real-time updates of other users with red markers
- ✅ Automatic cleanup of inactive users (30 seconds)
- ✅ Live status indicator showing online users count

### 2. **API Route** (`src/app/api/location/route.ts`)
- ✅ Accepts POST requests with `{ id, lat, lon }`
- ✅ In-memory storage with automatic cleanup
- ✅ Input validation for coordinates
- ✅ GET endpoint to retrieve all active locations
- ✅ DELETE endpoint to remove specific user locations

### 3. **Socket.IO Integration** (`server/socket.js`)
- ✅ Real-time broadcasting of location updates
- ✅ User connection/disconnection handling
- ✅ Automatic cleanup of inactive users
- ✅ CORS configuration for localhost:3000

### 4. **Main Page** (`src/app/page.tsx`)
- ✅ Dynamic import of Map component with `ssr: false`
- ✅ "Get's Started" button integration
- ✅ Seamless transition from landing page to map

## 🎯 How It Works

1. **User clicks "Get's Started"** → Map component loads
2. **Browser requests location permission** → User grants access
3. **Continuous location tracking** → `watchPosition` API tracks movement
4. **Real-time broadcasting** → Socket.IO sends updates to all connected clients
5. **Live map updates** → Other users see your marker moving in real-time

## 🔍 Technical Details

### Marker Icons
- **Blue marker**: Current user ("You are here 🚶‍♂️")
- **Red markers**: Other active users
- **Custom icons**: Using Leaflet color markers from CDN

### Real-time Updates
- **Location frequency**: Updates every time position changes
- **Cleanup interval**: Removes inactive users after 30 seconds
- **High accuracy**: GPS with `enableHighAccuracy: true`

### Error Handling
- Geolocation permission denied
- Location unavailable
- Request timeout
- Browser compatibility checks

## 🌐 URLs & Ports

- **Next.js App**: http://localhost:3000
- **Socket.IO Server**: http://localhost:4001
- **API Endpoint**: http://localhost:3000/api/location

## 🔧 Configuration

### Socket.IO CORS
```javascript
cors: {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
}
```

### Geolocation Options
```javascript
{
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000
}
```

## 🚨 Important Notes

1. **HTTPS Required**: Geolocation API requires HTTPS in production
2. **Permission Handling**: Users must grant location access
3. **Battery Usage**: Continuous tracking may drain battery
4. **Privacy**: Location data is temporary (in-memory storage)
5. **Scalability**: For production, use Redis or database instead of in-memory storage

## 🎨 UI Features

- Loading spinner while getting location
- Live tracking indicator
- Online users counter
- Responsive design
- Smooth animations

## 🔄 Data Flow

```
User Movement → Browser Geolocation → React Component → Socket.IO → Other Clients → Map Update
                                   ↓
                              API Route (Backup Storage)
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Hydration Errors**: Fixed with `ssr: false` in dynamic import
2. **Marker Icons Not Showing**: Fixed with CDN URLs and icon configuration
3. **Location Not Updating**: Check browser permissions and HTTPS
4. **Socket Connection Issues**: Ensure Socket.IO server is running on port 4001

### Debug Commands:
```bash
# Check if Socket.IO server is running
curl http://localhost:4001

# Test API endpoint
curl -X POST http://localhost:3000/api/location \
  -H "Content-Type: application/json" \
  -d '{"id":"test","lat":40.7128,"lon":-74.0060}'
```

## 🎉 Ready to Use!

Your real-time location tracking system is now fully configured and ready to use. Multiple users can now share and track locations in real-time on the same map!
