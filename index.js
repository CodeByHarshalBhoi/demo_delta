const express = require("express");
const app = express();
const path = require("path")
let port =3000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
// var methodOverride = require('method-override')
 

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))



let posts =[
    {
        id:uuidv4(),
        username:"Harshal Bhoi",
        content: "I love Coding...."
    },
    {
        id:uuidv4(),
        username:"Suraj Kumar",
        content: "I love Reading...."
    },
    {
        id:uuidv4(),
        username:"Rinkesh Bhoi",
        content: "I love Writing...."
    }
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs",  {posts})
})

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs")
})

app.post("/posts", (req, res)=>{
    let {username, content} = req.body
    let id = uuidv4();
    posts.push({id, username, content})
    res.redirect("/posts")
})

app.get("/posts/:id", (req, res)=>{
    let {id}= req.params;
    console.log(id)
    let post = posts.find((p)=> id === p.id);
    console.log(post);
    res.render("shows.ejs", {post})
})

app.patch("/posts/:id", (req, res)=>{
    let {id}= req.params;
    let newContent = req.body.content;
    console.log(id)
     let post = posts.find((p) => id === p.id)
    post.content = newContent;
    res.redirect("/posts")
})

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id)
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("edit.ejs", {post})
})
app.listen(port, ()=>{
    console.log(`Request receiving on port no ${port}`);
})
