const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async ()=>{

    try {
        
      await mongoose.connect(db,{
          useNewUrlParser:true,
          useCreateIndex:true,
          useFindAndModify:false,
          useUnifiedTopology:true,
         

      });

      console.log('mongoDB is connected');

    } catch (error) {

        console.log('error'+error);   
    }
}
module.exports = connectDB();
