import express from 'express'
import path from 'path'
import uploadRoutes from './Routes/uploadRoutes.js'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './Routes/productRoutes.js'
import { notFound , errorHandler } from './Middleware/errorMiddleware.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/OrderRoutes.js'
import morgan from 'morgan'
import cors from "cors"

const app=express()
app.use(cors({
    origin: '*'
}))

app.use(express.json())
dotenv.config()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
  }   


connectDB(process.env.DB_URI)

app.get('/',(req,res)=>{
    res.json({message:'Hello World'})
})



const __dirname = path.resolve()

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/api/upload', uploadRoutes)

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`${process.env.NODE_ENV} is running on port ${port}`.rainbow.bold)
})