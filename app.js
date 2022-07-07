const express = require("express");
const request = require("request");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const {userData} = require("./models/user");
const {QuesData} = require("./Data/QuesData");

// const port = process.env.PORT||3000;

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))


var tmp = [];


app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/home",(req,res)=>{
    res.render("home");
})

app.post("/home",(req,res)=>{
    const GameName = req.body.userName;
    console.log(GameName);
    const user = new userData({
        name : GameName,
        score : 0
    });
    userData.findOne({name:GameName},(err,foundResult)=>{
        if(err)
            console.log(err);
        if(foundResult){
            if(foundResult.name===GameName){
                console.log("User Already Exists");
                res.render("home");
            }
        }
        else{
            user.save((err)=>{
                if(err)
                    res.status(403).send(err);
                else{    
                    console.log("User Successfully Entered!! ");
                    res.render("quiz",{SData:QuesData});
                }
            });
        }
    });
});

app.get("/quiz",(req,res)=>{
    res.render("quiz",{SData:QuesData});
})

app.post("/quiz",(req,res)=>{
    var id = req.body.id;
    console.log(id);
    var nam = req.body.user;
    //console.log(parseInt(nam[1]));
    var correctness = 0;
    QuesData.map((x,ind)=>{
        if(parseInt(nam[ind])===x.ans)
            correctness+=1;
    });
    //console.log(correctness);
    userData.findOne({name:id},(err,result)=>{
        if(err)
            console.log(err);
        if(result && result.name===id){
            userData.findOneAndUpdate({name:id},{score:correctness},(err)=>{
                if(err)
                    res.status(403).send(err);
                else
                    res.redirect("score");
            });
        }
        else
            res.redirect("/");
    });
})

app.get("/creater",(req,res)=>{
    res.render("creater");
})

app.get("/score",(req,res)=>{
    userData.find((err,x)=>{
        if(err)
            console.log(err)
        if(x){
            //console.log(x);
            tmp = x;
            //console.log(tmp);
            res.render("score",{scoreDetails:tmp});
        }
    })
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(port,()=>{
    console.log("server is up and running ");
})