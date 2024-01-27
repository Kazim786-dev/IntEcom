import express from 'express'
import 'dotenv/config'
//routes
import userRouter from './routes/user/index.js'
import productRouter from './routes/product/index.js'
import orderRouter from './routes/order/index.js'
import authRouter from './routes/auth/index.js'
import wishlistRouter from './routes/wishlist/index.js'
import './config/database.js'
import authMiddleware from './middleware/auth.js'
import ApplyMiddlewares from './middleware/index.js'

const app = express()

ApplyMiddlewares(app);

// getting environment variables
const {devPort}= process.env


app.use('/auth', authRouter)
app.use('/users' ,userRouter)
app.use('/products' ,productRouter)
// app.use('/category',authMiddleware, categoryRouter)
app.use('/orders',authMiddleware ,orderRouter)
app.use('/wishlist', authMiddleware, wishlistRouter)

app.listen(devPort, () => {
  console.log(`Example app listening on port ${devPort}`)
})