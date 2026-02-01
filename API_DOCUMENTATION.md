# MeetUp API Documentation

## Base URL
```
Development: http://localhost:5001/api
Production: https://your-domain.com/api
```

## Authentication

All protected routes require a JWT token stored in an HTTP-only cookie named `jwt`.

---

## Authentication Endpoints

### 1. Send OTP

Send a one-time password to the user's email for verification.

**Endpoint:** `POST /auth/send-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

**Error Responses:**
- `400 Bad Request` - Email is required
- `400 Bad Request` - Email already in use
- `400 Bad Request` - Invalid email format
- `500 Internal Server Error` - Server error

---

### 2. Verify OTP

Verify the OTP sent to the user's email.

**Endpoint:** `POST /auth/verify-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Error Responses:**
- `400 Bad Request` - Email and OTP required
- `400 Bad Request` - Invalid or expired OTP
- `500 Internal Server Error` - Server error

---

### 3. Sign Up

Register a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "user@example.com",
    "profilePic": "https://api.dicebear.com/9.x/avataaars/png?seed=...",
    "bio": "",
    "nativeLanguage": "",
    "learningLanguage": "",
    "location": "",
    "isOnboarded": false,
    "friends": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - All fields are required
- `400 Bad Request` - Password must contain at least 8 characters
- `400 Bad Request` - Invalid email format
- `400 Bad Request` - Email already exists
- `500 Internal Server Error` - Server error

**Note:** A JWT token is set as an HTTP-only cookie upon successful signup.

---

### 4. Login

Authenticate an existing user.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "user@example.com",
    "profilePic": "https://...",
    "bio": "Language enthusiast",
    "nativeLanguage": "english",
    "learningLanguage": "spanish",
    "location": "New York, USA",
    "isOnboarded": true,
    "friends": ["friend_id_1", "friend_id_2"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - All fields are required
- `401 Unauthorized` - Invalid email
- `401 Unauthorized` - Invalid password
- `500 Internal Server Error` - Server error

**Note:** A JWT token is set as an HTTP-only cookie upon successful login.

---

### 5. Logout

Log out the current user.

**Endpoint:** `POST /auth/logout`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout Successful"
}
```

**Note:** The JWT cookie is cleared upon logout.

---

### 6. Complete Onboarding

Complete user profile setup after registration.

**Endpoint:** `POST /auth/onboarding`

**Authentication:** Required

**Request Body:**
```json
{
  "fullName": "John Doe",
  "bio": "I love learning new languages!",
  "nativeLanguage": "english",
  "learningLanguage": "spanish",
  "location": "New York, USA",
  "profilePic": "https://api.dicebear.com/9.x/avataaars/png?seed=..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "user@example.com",
    "profilePic": "https://...",
    "bio": "I love learning new languages!",
    "nativeLanguage": "english",
    "learningLanguage": "spanish",
    "location": "New York, USA",
    "isOnboarded": true,
    "friends": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - All fields are required
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

### 7. Get Current User

Get the authenticated user's information.

**Endpoint:** `GET /auth/me`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "user@example.com",
    "profilePic": "https://...",
    "bio": "I love learning new languages!",
    "nativeLanguage": "english",
    "learningLanguage": "spanish",
    "location": "New York, USA",
    "isOnboarded": true,
    "friends": ["friend_id_1", "friend_id_2"]
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No token provided
- `401 Unauthorized` - Invalid token
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

## User Endpoints

### 1. Get Recommended Users

Get a list of recommended language partners based on the user's profile.

**Endpoint:** `GET /users`

**Authentication:** Required

**Success Response (200):**
```json
[
  {
    "_id": "user_id_1",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "profilePic": "https://...",
    "bio": "Native Spanish speaker learning English",
    "nativeLanguage": "spanish",
    "learningLanguage": "english",
    "location": "Madrid, Spain",
    "isOnboarded": true
  },
  {
    "_id": "user_id_2",
    "fullName": "Carlos Rodriguez",
    "profilePic": "https://...",
    "bio": "Love teaching Spanish!",
    "nativeLanguage": "spanish",
    "learningLanguage": "english",
    "location": "Barcelona, Spain",
    "isOnboarded": true
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

---

### 2. Get My Friends

Get the current user's friend list.

**Endpoint:** `GET /users/friends`

**Authentication:** Required

**Success Response (200):**
```json
[
  {
    "_id": "friend_id_1",
    "fullName": "Jane Smith",
    "profilePic": "https://...",
    "nativeLanguage": "spanish",
    "learningLanguage": "english"
  },
  {
    "_id": "friend_id_2",
    "fullName": "Carlos Rodriguez",
    "profilePic": "https://...",
    "nativeLanguage": "spanish",
    "learningLanguage": "english"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

---

### 3. Send Friend Request

Send a friend request to another user.

**Endpoint:** `POST /users/friend-request/:id`

**Authentication:** Required

**URL Parameters:**
- `id` - The user ID to send the friend request to

**Success Response (201):**
```json
{
  "_id": "request_id",
  "sender": "current_user_id",
  "recipient": "recipient_user_id",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - You can't send friend request to yourself
- `400 Bad Request` - You are already friends with this user
- `400 Bad Request` - A friend request already exists
- `404 Not Found` - Recipient not found
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

---

### 4. Accept Friend Request

Accept a pending friend request.

**Endpoint:** `PUT /users/friend-request/:id/accept`

**Authentication:** Required

**URL Parameters:**
- `id` - The friend request ID to accept

**Success Response (200):**
```json
{
  "message": "Friend request accepted"
}
```

**Error Responses:**
- `403 Forbidden` - You are not authorized to accept this request
- `404 Not Found` - Friend request not found
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

---

### 5. Get Friend Requests

Get incoming and accepted friend requests.

**Endpoint:** `GET /users/friend-requests`

**Authentication:** Required

**Success Response (200):**
```json
{
  "incomingReqs": [
    {
      "_id": "request_id_1",
      "sender": {
        "_id": "sender_id",
        "fullName": "Jane Smith",
        "profilePic": "https://...",
        "nativeLanguage": "spanish",
        "learningLanguage": "english"
      },
      "recipient": "current_user_id",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "acceptedReqs": [
    {
      "_id": "request_id_2",
      "sender": "current_user_id",
      "recipient": {
        "_id": "recipient_id",
        "fullName": "Carlos Rodriguez",
        "profilePic": "https://..."
      },
      "status": "accepted",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

---

### 6. Get Outgoing Friend Requests

Get all pending friend requests sent by the current user.

**Endpoint:** `GET /users/outgoing-friend-requests`

**Authentication:** Required

**Success Response (200):**
```json
[
  {
    "_id": "request_id",
    "sender": "current_user_id",
    "recipient": {
      "_id": "recipient_id",
      "fullName": "Jane Smith",
      "profilePic": "https://...",
      "nativeLanguage": "spanish",
      "learningLanguage": "english"
    },
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

---

## Chat Endpoints

### 1. Get Stream Token

Get a Stream Chat token for the authenticated user.

**Endpoint:** `GET /chat/token`

**Authentication:** Required

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `500 Internal Server Error` - Server error

**Note:** This token is used to authenticate with Stream Chat and Stream Video services.

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description here"
}
```

## Status Codes

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests that create resources
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid credentials
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Currently, there is no rate limiting implemented. This may be added in future versions.

## Pagination

Currently, there is no pagination implemented. All list endpoints return complete results.

## Notes

- All timestamps are in ISO 8601 format
- User passwords are never returned in API responses
- JWT tokens are stored as HTTP-only cookies for security
- OTP codes expire after 10 minutes
- Friend requests can only be sent once between two users