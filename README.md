# 🌍 MeetUp - Social Networking Chatting Application

<div align="center">
  <img src="https://api.dicebear.com/9.x/avataaars/png?seed=meetup&radius=50" alt="MeetUp Logo" width="150"/>
  
  ### Connect with Language Partners Worldwide
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://www.mongodb.com/)
</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**MeetUp** is a modern language exchange platform that connects language learners from around the world. Users can find language partners, practice through real-time chat, and engage in video calls to improve their language skills together.

### Why MeetUp?

- 🌐 **Global Community**: Connect with learners worldwide
- 💬 **Real-time Chat**: Powered by Stream Chat
- 📹 **Video Calls**: Integrated Stream Video SDK
- 🎨 **Customizable Themes**: 30+ beautiful themes
- 🔒 **Secure Authentication**: OTP-based email verification
- 👥 **Friend System**: Send and accept friend requests

---

## ✨ Features

### User Management
- ✅ **Email & Password Authentication** with OTP verification
- ✅ **User Onboarding** with profile customization
- ✅ **Avatar Generation** using DiceBear API
- ✅ **Profile Management** (bio, languages, location)

### Social Features
- ✅ **Friend Requests** - Send, accept, and manage connections
- ✅ **Friend Recommendations** - Smart matching based on language preferences
- ✅ **User Discovery** - Find language partners by native and learning languages

### Communication
- ✅ **Real-time Chat** - Powered by Stream Chat
- ✅ **Video Calling** - Integrated Stream Video SDK
- ✅ **Notifications** - Real-time friend request notifications
- ✅ **Message History** - Persistent chat storage

### UI/UX
- ✅ **Responsive Design** - Mobile, tablet, and desktop support
- ✅ **30+ Themes** - Customizable color schemes (DaisyUI)
- ✅ **Dark/Light Mode** - Multiple theme options
- ✅ **Smooth Animations** - Enhanced user experience

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|-----------|-------------|
| **React 19** | UI library for building interactive interfaces |
| **Vite** | Fast build tool and dev server |
| **TailwindCSS** | Utility-first CSS framework |
| **DaisyUI** | Component library for Tailwind |
| **Stream Chat React** | Real-time chat UI components |
| **Stream Video React SDK** | Video calling components |
| **React Router** | Client-side routing |
| **TanStack Query** | Data fetching and caching |
| **Zustand** | State management |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

### Backend
| Technology | Description |
|-----------|-------------|
| **Node.js** | JavaScript runtime |
| **Express** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Tokens for authentication |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email sending service |
| **Stream Chat** | Real-time chat backend |
| **Stream Video** | Video calling infrastructure |
| **Cookie Parser** | Cookie handling middleware |
| **CORS** | Cross-origin resource sharing |

---

## 📁 Project Structure

```
MeetUp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Authentication logic
│   │   │   ├── user.controller.js      # User management
│   │   │   ├── chat.controller.js      # Chat token generation
│   │   │   └── otp.controller.js       # OTP verification
│   │   ├── models/
│   │   │   ├── User.model.js           # User schema
│   │   │   ├── FriendRequest.model.js  # Friend request schema
│   │   │   └── OTP.model.js            # OTP schema
│   │   ├── routes/
│   │   │   ├── auth.route.js           # Auth routes
│   │   │   ├── user.route.js           # User routes
│   │   │   └── chat.route.js           # Chat routes
│   │   ├── middleware/
│   │   │   └── auth.middleware.js      # JWT verification
│   │   ├── lib/
│   │   │   ├── db.js                   # MongoDB connection
│   │   │   └── stream.js               # Stream client setup
│   │   ├── utils/
│   │   │   └── sendOTP.js              # Email sending utility
│   │   └── app.js                      # Express app configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx              # Main layout wrapper
│   │   │   ├── Navbar.jsx              # Navigation bar
│   │   │   ├── Sidebar.jsx             # Sidebar navigation
│   │   │   ├── FriendCard.jsx          # Friend display card
│   │   │   ├── ThemeSelector.jsx       # Theme switching
│   │   │   ├── CallButton.jsx          # Video call trigger
│   │   │   ├── ChatLoader.jsx          # Chat loading state
│   │   │   ├── PageLoader.jsx          # Page loading state
│   │   │   ├── NoFriendsFound.jsx      # Empty state
│   │   │   └── NoNotificationsFound.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # Main dashboard
│   │   │   ├── LoginPage.jsx           # Login form
│   │   │   ├── SignUpPage.jsx          # Registration with OTP
│   │   │   ├── OnboardingPage.jsx      # Profile setup
│   │   │   ├── ChatPage.jsx            # Chat interface
│   │   │   ├── CallPage.jsx            # Video call interface
│   │   │   ├── FriendsPage.jsx         # Friends list
│   │   │   ├── NotificationsPage.jsx   # Notifications
│   │   │   └── NotFoundPage.jsx        # 404 page
│   │   ├── hooks/
│   │   │   ├── useAuthUser.js          # Auth user hook
│   │   │   ├── useLogin.js             # Login mutation
│   │   │   ├── useSignUp.js            # Signup mutation
│   │   │   ├── useLogout.js            # Logout mutation
│   │   │   └── useOTPauth.js           # OTP verification
│   │   ├── lib/
│   │   │   ├── api.js                  # API functions
│   │   │   ├── axios.js                # Axios configuration
│   │   │   └── utils.js                # Utility functions
│   │   ├── store/
│   │   │   └── useThemeStore.js        # Theme state management
│   │   ├── constants.js                # App constants
│   │   ├── App.jsx                     # Main app component
│   │   ├── main.jsx                    # App entry point
│   │   └── index.css                   # Global styles
│   ├── public/
│   │   ├── 1.png                       # Illustration
│   │   ├── 404Error.mp4                # 404 animation
│   │   └── cat.mp4                     # 404 cat animation
│   └── package.json
│
└── package.json                        # Root package.json
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**
- **Stream Account** ([Get API keys](https://getstream.io/))
- **Gmail Account** (for OTP emails)

### Step 1: Clone the Repository

```bash
git clone https://github.com/tanish0007/MeetUp.git
cd MeetUp
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3: Set Up Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/meetup?retryWrites=true&w=majority

# Server Configuration
PORT=5001
NODE_ENV=development

# Stream Configuration
STREAM_API_KEY=your_stream_api_key_here
STREAM_API_SECRET=your_stream_api_secret_here

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

**Note**: For `EMAIL_PASS`, you need to generate an App Password from your Gmail account:
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App Passwords → Generate new password

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# Stream Configuration
VITE_STREAM_API_KEY=your_stream_api_key_here
```

### Step 4: Run the Application

#### Development Mode

```bash
# Terminal 1 - Run backend
cd backend
npm run dev

# Terminal 2 - Run frontend
cd frontend
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001

#### Production Mode

```bash
# Build the application
npm run build

# Start the server
npm start
```

---

## 🔑 Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `PORT` | Server port number | `5001` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `STREAM_API_KEY` | Stream API key | `your_api_key` |
| `STREAM_API_SECRET` | Stream API secret | `your_api_secret` |
| `JWT_SECRET_KEY` | JWT signing secret | `random_secure_string` |
| `EMAIL_USER` | Gmail address for OTP | `example@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `16-char password` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_STREAM_API_KEY` | Stream API key (same as backend) | `your_api_key` |

---

## 📚 Usage

### 1. Sign Up
1. Navigate to the signup page
2. Enter your full name, email, and password
3. Click "Send OTP" to receive verification code
4. Enter the OTP and click "Verify"
5. Complete registration

### 2. Onboarding
1. After signup, complete your profile:
   - Generate or upload profile picture
   - Add bio
   - Select native language
   - Select learning language
   - Add location

### 3. Find Language Partners
1. Browse recommended users on the home page
2. Filter by language preferences
3. Send friend requests

### 4. Accept Friend Requests
1. Go to Notifications page
2. Review incoming requests
3. Accept requests to add friends

### 5. Start Chatting
1. Click on a friend from your friends list
2. Start typing in the message input
3. Send text messages in real-time

### 6. Video Calling
1. Open a chat with a friend
2. Click the video call button
3. Wait for the call link to be sent
4. Click the link to join the call

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/send-otp` | Send OTP to email | No |
| POST | `/api/auth/verify-otp` | Verify OTP code | No |
| POST | `/api/auth/onboarding` | Complete user profile | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get recommended users | Yes |
| GET | `/api/users/friends` | Get user's friends | Yes |
| POST | `/api/users/friend-request/:id` | Send friend request | Yes |
| PUT | `/api/users/friend-request/:id/accept` | Accept friend request | Yes |
| GET | `/api/users/friend-requests` | Get incoming/accepted requests | Yes |
| GET | `/api/users/outgoing-friend-requests` | Get outgoing requests | Yes |

### Chat

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/chat/token` | Get Stream chat token | Yes |

---

## 📸 Screenshots

### Home Page
Dashboard showing friends and recommended language partners

### Chat Interface
Real-time messaging with Stream Chat integration

### Video Call
High-quality video calls using Stream Video SDK

### Onboarding
User profile setup with language preferences

### Notifications
Friend request management system

---

## 🎨 Themes

MeetUp includes 30+ beautiful themes powered by DaisyUI:

- Light, Dark, Cupcake, Bumblebee, Emerald
- Corporate, Synthwave, Retro, Cyberpunk
- Valentine, Halloween, Garden, Forest
- Aqua, Lofi, Pastel, Fantasy, Wireframe
- Black, Luxury, Dracula, CMYK, Autumn
- Business, Acid, Lemonade, Night, Coffee
- Winter, Dim, Nord, Sunset

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 🐛 Known Issues

- Video call links are sent via chat (manual join required)
- No real-time notification system for incoming calls
- Limited language options (14 languages)

---

## 🔮 Future Enhancements

- [ ] Push notifications for messages and calls
- [ ] Group chat functionality
- [ ] Screen sharing in video calls
- [ ] Language learning resources integration
- [ ] Achievement system
- [ ] User ratings and reviews
- [ ] Advanced search filters
- [ ] Mobile app (React Native)
- [ ] AI-powered language correction
- [ ] Voice messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Tanish**
- GitHub: [@tanish0007](https://github.com/tanish0007)
- Project: [MeetUp](https://github.com/tanish0007/MeetUp)

---

## 🙏 Acknowledgments

- [Stream](https://getstream.io/) - For chat and video infrastructure
- [DaisyUI](https://daisyui.com/) - For beautiful UI components
- [DiceBear](https://dicebear.com/) - For avatar generation
- [Lucide](https://lucide.dev/) - For icons
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For database hosting

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/tanish0007/MeetUp/issues) page
2. Create a new issue if your problem isn't listed
3. Provide detailed information about your setup and error

---

<div align="center">
  Made with ❤️ by the MeetUp Team
  
  **⭐ Star this repo if you find it helpful!**
</div>