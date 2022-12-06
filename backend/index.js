const connectToMongo = require('./db');
const express = require('express');
const AuthRouter = require('./routes/AuthRouter');
const NoteRouter = require('./routes/NoteRouter');
const cors = require('cors');
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Basic Routes
app.use('/user/auth' , AuthRouter);
app.use('/user/notes' , NoteRouter);

app.get('/' , (req , res) => {
    res.send('Hello World');
})
app.listen(port , () => {
    console.log("Listening at port" , port);
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNzU4NWFlNmYxNDBkNjAwMjc2NmRhIn0sImlhdCI6MTY1NjIzOTEyN30.0O3AKLZYwAjDFdKVvtnUIKAO_1MfeoR6_NECwiqM1aI