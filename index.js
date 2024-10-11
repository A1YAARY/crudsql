const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1',        // XAMPP MySQL server host
  user: 'root',             // Default XAMPP MySQL username
  password: '',             // Default XAMPP MySQL password (usually empty)
  database:'student'  // Your database name
});






// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});







// let posts = []; // Temporary storage for blog posts



// Home Route
app.get('/', (req, res) => {

    const sql = 'SELECT * FROM users'
    connection.query(sql,(err,result)=>{
        if(err){
            console.error("err",err);
            res.status(500).send("error in inserting data ")
        }
        else{
            console.log('data inserted',result);
            res.render('index.ejs',{ users: result } );
            
        }
    })
   
});

// Create assignment Route
app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    // const post = {
    //     id: Date.now(),
    //     title: req.body.title,
    //     content: req.body.content
    // };
    // posts.push(post); // Store the post temporarily
    // console.log('posts ',post);
    // const StudentID = Date.now()
    // const name = req.body.title;
    // const email = req.body.content
    // console.log('id is ',StudentID);
    // console.log('name is ',name);
    // console.log('email is ',email);
    
    // console.log('Inserting data:', { name: post.title, email: post.content });
    const id = Math.floor (1000*Math.random(Date.now()));
    const  content =req.body.content;
   const grade = req.body.grade;
   const created_at = req.body.created;
   const updated_at = req.body.updated;
   const student_id = req.body.student;
   const teacher_id = req.body.teacher;

    
    const sql = 'INSERT INTO users(id,student_id,teacher_id,content,grade,created_at) VALUES(?,?,?,?,?,?)';
 connection.query(sql,[ id,student_id,teacher_id,content,grade,created_at],(err,result)=>{
        if(err){
            console.error("err",err);
            res.status(500).send("error in inserting data ")
        }
        else{
            console.log('data inserted',result);
            res.redirect('/');
        }
    }) 
    // console.log('request is ',req);
    // console.log('request is body ',req.body);
   

});



// Edit Post Route
app.get('/edit/:id', (req, res) => {

    const sql = 'SELECT * FROM users'
    connection.query(sql,(err,result)=>{
        if(err){
            console.error("err",err);
            res.status(500).send("error in inserting data ")
        }
        else{
            console.log('data inserted',result);
            res.render('edit.ejs',{ red: result } );
            
            console.log('id',req.params);
            
        }
    })   
});

app.post('/edit/:id', (req, res) => {

  
    

    const id = parseInt(req.params.id);
   
    const  content =req.body.content;
   const grade = req.body.grade;
   const created_at = req.body.created;
   const updated_at = req.body.updated;
   const student_id = req.body.student;
   const teacher_id = req.body.teacher;

   const updatesql = " UPDATE users SET content=? , grade=? , created_at=? ,updated_at=?, student_id=?, teacher_id=? WHERE id=? "
   connection.query(updatesql,[content , grade, created_at ,updated_at,student_id,teacher_id,id],(err,result)=>{
    if(err){
        console.error("err",err);
        res.status(500).send("error in inserting data ")
    }
    else{
        console.log('data inserted',result);
        res.redirect('/');
    }
}) 
    
    
});

// Delete Post Route
app.post('/delete/:id', (req, res) => {
 
    const id3 = parseInt(req.params.id);

    const deletesql = "DELETE FROM users WHERE id =? "
connection.query(deletesql,[id3],(err,result)=>{
    if(err){
        console.error("err",err);
        res.status(500).send("error in deleting data ")
    }
    else{
        console.log('data deleted',result);
        
    }
})
    
    
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
