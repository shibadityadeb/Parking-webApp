# 🚗 Parking Management System

A comprehensive web-based parking management system built with React, Node.js, Express, and Supabase. The system provides role-based access control for different user types and includes features like QR code scanning for quick parking registration.

## ✨ Features

### Core Features
- **User Authentication & Authorization** - JWT-based authentication with role-based access control
- **QR Code Scanning** - Quick parking registration using camera/QR scanner
- **Parking Management** - Create, view, and manage parking entries
- **Driver Management** - Add and manage driver information
- **Car Management** - Register and manage vehicle information
- **Payment Tracking** - Mark parking entries as paid/unpaid
- **Admin Dashboard** - System insights and user management
- **Responsive Design** - Mobile-friendly interface

### Role-Based Features
- **Admin**: Full system access, user management, system insights
- **Manager**: Driver/car management, parking history, payment tracking
- **User**: Basic parking registration and viewing

### Supabase Schema Design

<img width="2414" height="1684" alt="supabase-schema-itrizshuzklhkxlynnaj" src="https://github.com/user-attachments/assets/6ea73919-7d13-4754-abac-57b4d90726a3" />

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **React QR Scanner** - QR code scanning functionality
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database & Services
- **Supabase** - Backend-as-a-Service (PostgreSQL database)
- **Supabase Auth** - Authentication service
- **Supabase Storage** - File storage (if needed)

## 📁 Project Structure

```
parking-assignment/
└── parking-app/
    ├── backend/
    │   ├── src/
    │   │   ├── controllers/
    │   │   │   ├── adminController.js
    │   │   │   ├── authController.js
    │   │   │   ├── carController.js
    │   │   │   ├── driverController.js
    │   │   │   └── parkingController.js
    │   │   ├── middleware/
    │   │   │   └── auth.js
    │   │   ├── routes/
    │   │   │   ├── admin.js
    │   │   │   ├── auth.js
    │   │   │   ├── cars.js
    │   │   │   ├── drivers.js
    │   │   │   └── parkings.js
    │   │   ├── services/
    │   │   │   └── supabase.js
    │   │   └── server.js
    │   ├── .env
    │   └── package.json
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── CarForm.jsx
        │   │   ├── DriverForm.jsx
        │   │   ├── Header.jsx
        │   │   ├── Navbar.jsx
        │   │   ├── QRScanner.jsx
        │   │   ├── ScanToParkCard.jsx
        │   │   └── ...
        │   ├── contexts/
        │   │   └── AuthContext.jsx
        │   ├── pages/
        │   │   ├── AdminDashboard.jsx
        │   │   ├── Home.jsx
        │   │   ├── Login.jsx
        │   │   └── ...
        │   ├── services/
        │   │   ├── adminService.js
        │   │   ├── parkingService.js
        │   │   └── supabaseClient.js
        │   ├── styles/
        │   │   └── theme.css
        │   └── App.jsx
        ├── .env
        └── package.json
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **Git**
- A **Supabase** account and project

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd parking-assignment/parking-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Configuration

1. **Create `.env` file in the backend directory:**
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

### Frontend Configuration

1. **Create `.env` file in the frontend directory:**
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:5000/api
   ```

### Supabase Setup

1. **Create a new Supabase project**
2. **Set up the database tables** (you may need to create these based on your schema)
3. **Configure authentication settings**
4. **Get your project URL and anon key from the Supabase dashboard**

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Driver Management
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create new driver
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Delete driver

### Car Management
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Register new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Parking Management
- `GET /api/parkings` - Get all parking entries
- `POST /api/parkings` - Create parking entry
- `PUT /api/parkings/:id/pay` - Mark as paid
- `DELETE /api/parkings/:id` - Delete parking entry

### Admin Endpoints
- `GET /api/admin/insights` - Get system insights
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role

## 👥 User Roles

### Admin
- Full system access
- User management
- System insights and analytics
- All manager and user permissions

### Manager
- Driver management (CRUD operations)
- Car management (CRUD operations)
- Parking history and management
- Payment tracking
- All user permissions



## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Create a new project on your preferred platform
2. Set environment variables
3. Deploy from GitHub repository

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform.

## 🎯 Key Features Explained

### QR Code Scanning
- Click "Scan QR Code" button on the dashboard
- Grant camera permissions when prompted
- Position QR code within the scanning frame
- Automatic parking registration upon successful scan

### Role-Based Access Control
- Different navigation menus based on user role
- Protected routes that redirect unauthorized users
- Role-specific functionality and permissions

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interface elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🐛 Known Issues

- QR scanner currently uses a simulation for demo purposes
- Camera permissions need to be granted for QR scanning
- Some mobile browsers may have camera access limitations
- Backend may get idle as it is in the free tier-version of render

## 📞 Support

For support and questions, please create an issue in the GitHub repository.

---

**Made with ❤️ by Shibaditya Deb**
