const db = require('mongoose');

const connectDb = async()=>{
    try{
        await db.connect('mongodb://localhost:27017/todo_app',{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log('mongodb connected');
    }
    catch(err){
        console.error('db connection error ' , err);
        process.exit(1);
    }
};

module.exports = connectDb;