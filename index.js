const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const List=require('./models/todo')

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// var todolist=[
//     {
//         desc:'why not add a task',
//         date:'12/3/4',
//         category:"school"
//     },
//     {
//         desc:'why not add a task',
//         date:'12/3/4',
//         // category:"school"
//     },
// ]

app.get('/',function(req,res){
    List.find({},function(err,tasks){
        if(err){
            console.log("Error in fetching data from db");
            return;
        }
        return res.render('home',{
            title:"TO DO LIST",
            task:tasks,
            
        });
    });
});

app.post('/create-list',function(req,res){
    List.create({
        desc:req.body.desc,
        dropdown:req.body.dropdown,
        date:req.body.date,
        isComplete:false

    },function(err,newList){
        if(err){
            console.log('error in creating list',err);
            return;
        }
        // console.log(newList);
        return res.redirect('back');
    });
});


app.post('/delete-task', function(req,res){
    let id = req.body.task;
    //To delete single task
    if(id==null)
    {
        return res.redirect('back');
    }
    if(id.length==24){
        List.findByIdAndDelete(id, function(err){
            if(err){
                console.log('Error in deleting an object from database');
                return;
            }
        });
        return res.redirect('back');
    }
    //To delete multiple tasks
    for (let i of id){
        List.findByIdAndDelete(i, function(err){
            if(err){
                console.log('Error in deleting an object from database');
                return;
            }
        });
    }
    return res.redirect('back');
});


app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running the server');
    }
    console.log('Server is running on port: ',port);
    
});
