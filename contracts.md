# FlowArt API Contracts & Integration Plan

## Current Mock Data to Replace

### From mockData.js:
1. **mockUsers** - 6 artist profiles with full details
2. **mockArtworks** - 9 artwork entries  
3. **mockCommunityPosts** - 5 community board posts

## API Endpoints to Implement

### 1. Authentication APIs

#### POST /api/auth/register
```json
Request: {
  "name": "string",
  "email": "string",
  "password": "string"
}
Response: {
  "user": { "id": "string", "name": "string", "email": "string" },
  "token": "jwt_token"
}
```

#### POST /api/auth/login
```json
Request: {
  "email": "string",
  "password": "string"
}
Response: {
  "user": { "id": "string", "name": "string", "email": "string" },
  "token": "jwt_token"
}
```

#### GET /api/auth/me (Protected)
```json
Headers: { "Authorization": "Bearer <token>" }
Response: {
  "id": "string",
  "name": "string",
  "email": "string",
  "username": "string",
  "bio": "string",
  "avatar": "string",
  "coverImage": "string",
  "location": "string",
  "medium": "string",
  "experience": "string",
  "social": { "instagram": "string", "twitter": "string", "website": "string" },
  "verified": "boolean",
  "followers": "number"
}
```

### 2. User/Artist Profile APIs

#### GET /api/users
Query params: ?medium=<medium>&experience=<experience>&search=<query>
```json
Response: [{
  "id": "string",
  "name": "string",
  "username": "string",
  "bio": "string",
  "avatar": "string",
  "coverImage": "string",
  "location": "string",
  "medium": "string",
  "experience": "string",
  "social": { "instagram": "string", "twitter": "string", "website": "string" },
  "verified": "boolean",
  "followers": "number"
}]
```

#### GET /api/users/:id
```json
Response: {
  // Same as single user object above
}
```

#### PUT /api/users/:id (Protected)
```json
Request: {
  "bio": "string",
  "location": "string",
  "medium": "string",
  "experience": "string",
  "social": { "instagram": "string", "twitter": "string", "website": "string" }
}
Response: { // Updated user object }
```

### 3. Artworks API (Phase 2 - Can remain mocked for MVP)

#### GET /api/artworks
```json
Response: [{
  "id": "string",
  "title": "string",
  "artist": "string",
  "artistId": "string",
  "image": "string",
  "medium": "string",
  "year": "number",
  "likes": "number"
}]
```

### 4. Community Board APIs (Phase 2 - Can remain mocked for MVP)

#### GET /api/community/posts
Query params: ?type=<type>&tag=<tag>
```json
Response: [{
  "id": "string",
  "type": "string",
  "author": "string",
  "authorId": "string",
  "title": "string",
  "content": "string",
  "date": "string",
  "tags": ["string"],
  "likes": "number",
  "comments": "number"
}]
```

## MongoDB Schema Design

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  username: String (unique, indexed),
  email: String (unique, indexed),
  password: String (hashed),
  bio: String,
  avatar: String (URL),
  coverImage: String (URL),
  location: String,
  medium: String (enum: ['Digital', 'Canvas', 'Sculpture']),
  experience: String (enum: ['Emerging', 'Mid-Career', 'Professional']),
  social: {
    instagram: String,
    twitter: String,
    website: String
  },
  verified: Boolean (default: false),
  followers: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Artwork Collection (Phase 2)
```javascript
{
  _id: ObjectId,
  title: String,
  artistId: ObjectId (ref: User),
  image: String (URL),
  medium: String,
  year: Number,
  likes: Number (default: 0),
  createdAt: Date
}
```

### CommunityPost Collection (Phase 2)
```javascript
{
  _id: ObjectId,
  type: String (enum: ['Open Call', 'Project Update']),
  authorId: ObjectId (ref: User),
  title: String,
  content: String,
  tags: [String],
  likes: Number (default: 0),
  comments: Number (default: 0),
  createdAt: Date
}
```

## Frontend Integration Plan

### 1. Create API Service Layer
File: `/app/frontend/src/services/api.js`
- Centralized axios instance with base URL
- Auth token management (localStorage)
- Error handling interceptors

### 2. Create Auth Context
File: `/app/frontend/src/contexts/AuthContext.jsx`
- User state management
- Login/logout functions
- Protected route wrapper

### 3. Update Components

#### AuthModal.jsx
- Connect form submission to `/api/auth/register` and `/api/auth/login`
- Store token in localStorage
- Update AuthContext on success
- Show error toasts on failure

#### Connectory.jsx
- Replace `mockUsers` with API call to `/api/users`
- Add loading states
- Implement real-time filtering via API query params

#### HomePage.jsx
- Replace `mockUsers` and `mockArtworks` with API calls
- Featured artists from `/api/users?limit=4`

#### CommunityBoard.jsx (Phase 2)
- Can remain with mock data for MVP

### 4. Environment Variables
Already configured:
- `REACT_APP_BACKEND_URL` - Base API URL

## Implementation Order

### Phase 1: MVP (Full Backend)
1. ✅ Authentication system (JWT)
2. ✅ User profiles CRUD
3. ✅ User directory with filters
4. Frontend integration with API layer
5. Protected routes implementation

### Phase 2: Enhancement (Can be mocked)
1. Artworks system
2. Community board with posts
3. Follow/unfollow functionality
4. Real-time likes and comments

## Testing Checklist

### Backend:
- [ ] User registration with validation
- [ ] User login returns valid JWT
- [ ] Protected routes reject invalid tokens
- [ ] User profile retrieval
- [ ] User profile update
- [ ] User search and filtering
- [ ] Password hashing works correctly

### Frontend:
- [ ] Registration form creates user
- [ ] Login form authenticates user
- [ ] Token persists in localStorage
- [ ] Protected pages redirect to login
- [ ] Connectory loads users from API
- [ ] Filters work with API
- [ ] Profile data displays correctly
- [ ] Logout clears auth state

## Notes
- Artworks and Community Board can remain with high-quality mock data
- Infrastructure is ready to scale to full backend
- Focus MVP on authentication and user profiles (Nexus Card)
- JWT tokens expire after 7 days
- Profile images stored as URLs (Unsplash for MVP)
