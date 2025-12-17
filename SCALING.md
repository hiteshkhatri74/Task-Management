# Scaling Strategy

## Frontend Scaling
- Component-based architecture
- Centralized auth state using Context
- Can migrate to Redux if app grows
- Code splitting & lazy loading for performance
- Environment-based API URLs

## Backend Scaling
- MVC folder structure
- JWT middleware reusable
- Can add Redis for caching sessions
- Can move to microservices (Auth / Tasks)
- Rate limiting & helmet for security

## Database Scaling
- Indexes on userId and email
- Pagination for tasks
- MongoDB Atlas auto-scaling

## Deployment
- Frontend: Vercel / Netlify
- Backend: Render / Railway / AWS
- MongoDB Atlas for DB