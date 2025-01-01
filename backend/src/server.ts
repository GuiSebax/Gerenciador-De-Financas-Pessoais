import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import transactionRouter from './routes/transactionRoutes'
import goalRouter from './routes/goalRoutes'
import authRoutes from './routes/authRoutes'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', transactionRouter)
app.use('/api', goalRouter)
app.use('/api', authRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})