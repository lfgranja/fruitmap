# Fruit Map API Documentation

## Base URL
The API base URL depends on the environment:
- Development: `http://localhost:5000/api`
- Production: `[production-domain]/api`

The frontend will use the `REACT_APP_API_URL` environment variable, defaulting to `http://localhost:5000/api` if not provided.

## Authentication

### AuthService
The `AuthService` is responsible for generating and verifying JSON Web Tokens (JWTs) used for user authentication. It provides methods to create new tokens upon successful login/registration and to validate incoming tokens from authenticated requests.

**Token Generation:**
- `generateToken(user: { id: string; email: string }): string`
  - Creates a new JWT for the given user payload.

**Token Verification:**
- `verifyToken(token: string): { id: string; email: string }`
  - Verifies the authenticity and validity of a given JWT.
  - Throws `InvalidTokenError` for malformed or invalid tokens.
  - Throws `ExpiredTokenError` for tokens that have passed their expiration time.

Most endpoints require authentication using JWT tokens. The token should be included in the Authorization header as a Bearer token:
```
Authorization: Bearer <jwt-token>
```

### API Endpoints

### Trees

#### GET /trees
Retrieve all trees with optional filtering parameters.

**Parameters:**
- `speciesId` (optional): Filter trees by species ID
- `accessibility` (optional): Filter trees by accessibility type (e.g., "public", "community")
- `status` (optional): Filter trees by status
- `limit` (optional): Limit number of results (default: 50)
- `offset` (optional): Offset for pagination (default: 0)
- `minLat`, `maxLat`, `minLng`, `maxLng` (optional): Bounding box coordinates for spatial filtering
- `lat`, `lng`, `radius` (optional): Center point and radius (in km) for circular filtering

**Response:**
```json
{
  "trees": [
    {
      "id": "string",
      "location": {
        "type": "Point",
        "coordinates": [number, number] // [longitude, latitude]
      },
      "title": "string",
      "description": "string",
      "accessibility": "string",
      "contributor": {
        "username": "string"
      },
      "species": {
        "name": "string"
      }
    }
  ]
}
```

#### GET /trees/:id
Retrieve a specific tree by ID.

**Response:**
```json
{
  "tree": {
    "id": "string",
    "location": "GeoJSON object or string",
    "title": "string",
    "description": "string",
    "accessibility": "string",
    "contributor": {
      "username": "string"
    },
    "species": {
      "name": "string"
    }
  }
}
```

#### POST /trees
Create a new tree.

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "speciesId": number,
  "location": "string or GeoJSON object",
  "title": "string",
  "description": "string",
  "accessibility": "string"
}
```

**Response:**
```json
{
  "tree": {
    "id": "string",
    "location": "GeoJSON object or string",
    "title": "string",
    "description": "string",
    "accessibility": "string",
    "contributor": {
      "username": "string"
    },
    "species": {
      "id": number,
      "name": "string"
    }
  }
}
```

#### PATCH /trees/:id
Update an existing tree.

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <jwt-token>`

**Request Body (all fields optional):**
```json
{
  "speciesId": number,
  "location": "string or GeoJSON object",
  "title": "string",
  "description": "string",
  "accessibility": "string",
  "status": "string"
}
```

**Response:**
```json
{
  "tree": {
    "id": "string",
    "location": "GeoJSON object or string",
    "title": "string",
    "description": "string",
    "accessibility": "string",
    "contributor": {
      "username": "string"
    },
    "species": {
      "id": number,
      "name": "string"
    }
  }
}
```

#### DELETE /trees/:id
Delete a tree.

**Headers:**
- `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "message": "Tree deleted successfully"
}
```

#### GET /trees/search
Search for trees with various criteria.

**Parameters:**
- `query` (optional): Text search query
- `species` (optional): Filter by species name
- `lat`, `lng`, `radius` (optional): Center point and radius (in km) for spatial search

**Response:**
```json
{
  "trees": [...]
}
```


### Reviews

#### POST /reviews
Create a new review for a tree.

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "treeId": "string",
  "rating": number,
  "comment": "string"
}
```

**Response:**
```json
{
  "message": "Review created successfully",
  "review": {
    "id": "string",
    "treeId": "string",
    "userId": "string",
    "rating": number,
    "comment": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### GET /reviews/tree/:treeId
Get reviews for a specific tree.

**Parameters:**
- `limit` (optional): Limit number of results (default: 10)
- `page` (optional): Page number for pagination (default: 1)

**Response:**
```json
{
  "reviews": [
    {
      "id": "string",
      "rating": number,
      "comment": "string",
      "createdAt": "date",
      "user": {
        "username": "string",
        "fullName": "string"
      }
    }
  ],
  "pagination": {
    "total": number,
    "limit": number,
    "page": number,
    "pages": number,
    "averageRating": number
  }
}
```

#### PATCH /reviews/:reviewId
Update an existing review.

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <jwt-token>`

**Request Body (all fields optional):**
```json
{
  "rating": number,
  "comment": "string"
}
```

**Response:**
```json
{
  "message": "Review updated successfully",
  "review": {
    "id": "string",
    "treeId": "string",
    "userId": "string",
    "rating": number,
    "comment": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### DELETE /reviews/:reviewId
Delete a review.

**Headers:**
- `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "message": "Review deleted successfully"
}
```

#### GET /reviews/tree/:treeId/stats
Get review statistics for a specific tree.

**Response:**
```json
{
  "averageRating": number,
  "reviewCount": number,
  "ratingDistribution": [
    {
      "rating": number,
      "count": number
    }
  ]
}
```

### Species

#### GET /species
Retrieve all available tree species.

**Response:**
```json
{
  "species": [
    {
      "id": number,
      "name": "string",
      "scientificName": "string"
    }
  ]
}
```

#### GET /species/:id
Retrieve a specific species by ID.

**Response:**
```json
{
  "species": {
    "id": number,
    "name": "string",
    "scientificName": "string"
  }
}
```

### Authentication

#### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  }
}
```

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "username": "string"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  }
}
```

#### GET /auth/profile
Get authenticated user's profile.

**Headers:**
- `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "fullName": "string"
  }
}
```

## Error Handling

All error responses follow this format:

**Response:**
```json
{
  "error": "Error message",
  "details": "Additional details about the error (optional)"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request (validation error)
- `401`: Unauthorized (invalid or missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `500`: Server error