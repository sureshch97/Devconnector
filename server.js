const express = require('express');
const app = express();
const connectDB = require('./config/db');


// connect to mongoDB
connectDB;

//init middleware

app.use(express.json({extended:false}));



 app.get('/', (req,res)=>res.send('api is running'));

 //Define Routes
 app.use('/api/users' , require('./routes/api/users'));
 app.use('/api/profile' , require('./routes/api/profile'));
 app.use('/api/auth' , require('./routes/api/auth'));
 app.use('/api/post' , require('./routes/api/posts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`server is started at ${PORT}`));