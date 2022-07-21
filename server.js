const express = require('express');
const app = express();
const port = 8000;
var bodyParser = require('body-parser');
const cors = require("cors");

//importar ligação à DB
const db = require('./db.js');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/funcionarios', async function (req, res) {
	
	const funcionarios = await db.query("select * from funcionario");

	res.send(funcionarios);
});

app.get('/users/', async function (req, res) {
	const users = await db.query("select id, name, birthdate, job from users");

	res.send(users);
});

app.get('/comments/', async function (req, res) {

	const comments = await db.query("select comments.id, users.name as 'Autor', posts.title as 'Titulo' from comments inner join users on user_id=users.id inner join posts on post_id=posts.id");
	res.send(comments);
});


app.get('/posts/', async function (req, res) {
	const posts = await db.query("SELECT id, title FROM posts");
	res.send(posts);
});


app.get('/users/:id/comments', async function (req, res) {
	console.log(req.params.id);
	const id = req.params.id;

	const userComments = await db.query("select users.name, comments.id from comments inner join users on user_id=users.id where users.id=" + id);
	res.send(userComments);
});


app.get('/users/:id/posts', async function (req, res) {
	console.log(req.params.id);
	const id = req.params.id;

	const userPosts = await db.query("select title, users.name from posts inner join users on user_id=users.id where users.id=" + id);
	res.send(userPosts);
});

app.get('/posts/:id/comments', async function (req, res) {
	console.log(req.params.id);
	const id = req.params.id;
	
	const commentsPost = await db.query("select comments.id, posts.title from comments inner join posts on post_id=posts.id where post_id=" + id);

	res.send(commentsPost);
});


app.get('/info', async function (req, res) {
	const quantUsCommPos = await db.query("select count(*) as 'Total Utilizadores' from users union select count(*) as 'Total Posts' from posts union  select count(*) as 'Total Comentários' from comments");
	res.send(quantUsCommPos);
});

app.post('/users', (req, res) => {

	db.insert('INSERT INTO users SET ?', req.body);  
	
	//console.log("INSERT" + obj);

	res.send(JSON.stringify({ success: "true" }));

});

app.post("/posts", (req,res) => {

	let sql="INSERT INTO posts SET ?";

	db.insert(sql, req.body);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
}) 
