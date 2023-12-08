import express from 'express'
import 'dotenv/config'
//routes
import userRouter from './routes/user/index.js'
import productRouter from './routes/product/index.js'
import authRouter from './routes/auth/index.js'

import './config/database.js'
import ApplyMiddlewares from './middleware/index.js'

//semantic search
import semanticRouter from './routes/semantic/index.js'

const app = express()

ApplyMiddlewares(app);

// getting environment variables
const {devPort}= process.env
// app.get('/', (req,res)=>{res.send("hello")})
app.use('/auth', authRouter)
app.use('/users' ,userRouter)
app.use('/products' ,productRouter)
app.use('/semantic', semanticRouter)

app.listen(devPort, () => {
  console.log(`Example app listening on port ${devPort}`)
})