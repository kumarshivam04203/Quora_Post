// import express
const express = require("express");
// create app
const app = express();
// port
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"))
// set the view engine to view folder and public folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// create Array 
let posts = [
    {
      id: uuidv4(),
      username : "viaan",
      content : "I love babu"  
    },
    {
      id: uuidv4(),
        username : "Shivam Kumar",
        content : "Hard work is important to achive success "  
      },
      {
        id: uuidv4(),
        username : "Hello Jee",
        content : "Hii, I am happy"  
      },
];

// basic route
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let {username, content} = req.body;
  let id = uuidv4();
  posts.push({id, username, content});
  res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
  let {id} = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", {post});
})

// update route
app.patch("/posts/:id", (req, res) => {
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  // res.send("patch request working");
  res.redirect("/posts");
})
// Edit route
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", {post});
})

// delete route
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  // res.send("delete success");
  res.redirect("/posts");
})

app.listen(port, () =>{
    console.log("listening to port : 8080");
});