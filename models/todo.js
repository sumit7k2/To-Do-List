const mongoose=require('mongoose');

const todolistSchema=new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    dropdown:{
        type:String,
        required:true
    },
    isComplete: {
        type: Boolean,
        required:true
    }
});

const List=mongoose.model('ToDoList',todolistSchema);

module.exports=List;