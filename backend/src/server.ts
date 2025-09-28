import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import sequelize from './src/config/database'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Compression
app.use(compression())

// Import routes
import authRoutes from './src/routes/authRoutes'
import treeRoutes from './src/routes/treeRoutes'
import reviewRoutes from './src/routes/reviewRoutes'

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/trees', treeRoutes)
app.use('/api/reviews', reviewRoutes)

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found'
  })
})

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully.')
    
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true }) // Use { force: true } to reset tables
      console.log('Database synchronized.')
    }
    
    app.listen(PORT, () => {
      console.log(`Fruit Map server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}

startServer()

export default app