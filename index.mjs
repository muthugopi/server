import express from "express";
import morgan from "morgan";
import fs from 'fs'
const app = express();

const PORT = 3000;
const users = [
    { id: 1, user_name: "muthu" },
    { id: 2, user_name: "gopi" },
    { id: 3, user_name: "emirates" },
    { id: 4, user_name: "emix" }

];

const products = [
    {id:1, p_name:"mobile"},
    {id:2, p_name:"headphones"},
    {id:3, p_name:"laptop"},
    {id:4, p_name:"keyboard"}
];

const books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", available: true },
  { id: 2, title: "Atomic Habits", author: "James Clear", available: false },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", available: true }
];

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/api/books', (req, res)=>{
    res.send(books);
});

app.get('/api/books/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id) 
    if (book) {
        if (!book.available) {
            return res.send({msg:'books is not available'})
        }
        console.log(book);
        return res.send(book);
    }
     res.status(404).send({msg:'invalid request'})
});


app.get('/api/products', (req, res)=> {
    res.send(products);
});

app.get('/api/products/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(500).send({msg:"bad request. invalid prodect"});
    }
    const product = products.find(p => p.id === id );
    if (product) {
        console.log(product);
        return res.send(product);
    }
    res.send({msg:'invalid product'})
});

app.get('/api/users', (req, res) => {
    res.send(users)

});

app.get('/api/users/:id', (req, res) => {
    // console.log(req.params);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ msg: "bad request invalid id" });
    }
    const user = users.find((u) => u.id === id);
    if (user) {
        res.send(user);
        return console.log(user);
    }
    res.status(404).send({ msg: "user not found" });
});

app.get('/', (req, res) => {
    res.send({ msg: "this is a message" });
});

app.get('/home', (req, res)=> {
    res.redirect('/');
});


app.use((req, res)=> {
    res.status(404).send('invalid url')
});

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});