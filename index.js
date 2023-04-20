const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});

// Connect
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql Connected...');
});

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE mydb';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Database created...');
  });
});

// Create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Posts table created...');
  });
});

// Insert post
app.post('/addpost', (req, res) => {
  let post = {title:req.body.title, body:req.body.body};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post added...');
  });
});

// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send(results);
  });
});

// Update post
app.put('/updatepost/:id', (req, res) => {
  let newTitle = req.body.title;
  let newBody = req.body.body;
  let sql = `UPDATE posts SET title='${newTitle}', body='${newBody}' WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post updated...');
  });
});

// Delete post
app.delete('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post deleted...');
  });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});