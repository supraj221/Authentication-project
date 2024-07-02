# User Authentication and JWT API

This project implements a simple user authentication system and JWT-based API using Express.js and jsonwebtoken.

## Features

- User sign-in endpoint
- JWT token generation
- Protected route to fetch user data
- In-memory user database

## Endpoints

### POST /signin

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
