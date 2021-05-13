const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');



// connect to mongoDB
connectDB;

//init middleware

app.use(express.json({extended:false}));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


 //Define Routes
 app.use('/api/users' , require('./routes/api/users'));
 app.use('/api/profile' , require('./routes/api/profile'));
 app.use('/api/auth' , require('./routes/api/auth'));
 app.use('/api/post' , require('./routes/api/posts'));


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`server is started at ${PORT}`));