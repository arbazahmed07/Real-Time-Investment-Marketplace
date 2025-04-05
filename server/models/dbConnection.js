const mongoose=require('mongoose');
const db_link='mongodb+srv://mdarbazking7:Mdarbaz123@cluster0.hlmjter.mongodb.net/invst';

let connection=mongoose.connect(db_link).then((db)=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err)
});

// singleton design pattern used here
class DBConnection {
    constructor() {
      throw new Error('Use the getInstance() method on the Singleton object!');
    }
  
    getInstance() {
      if (!DBConnection.instance) {
        DBConnection.instance = connection;
      }
  
      return DBConnection.instance;
    }
  }
  
module.exports=DBConnection;
