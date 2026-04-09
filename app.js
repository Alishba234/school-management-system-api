require("dotenv").config()
const express=require('express');
//const globalErrorHandler=require('./utils/globalErrorHandler')
const ConnectDB=require('./config/db')
const schoolRoutes=require('./routes/schoolRoutes')
const app=express()
const PORT=process.env.PORT;
app.use(express.json())
app.use('/api',schoolRoutes)
ConnectDB()
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})
