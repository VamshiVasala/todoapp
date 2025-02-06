const db = require('mongoose');

const taskSchema = new db.Schema(
    {
        username:{type:db.Schema.Types.ObjectId,ref:' user',required:true},
        description:{type:String,required:true},
        completed:{type:Boolean,required:true},
    },
    {timestamps:true}
);

module.exports = db.model('task',taskSchema);