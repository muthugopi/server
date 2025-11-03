import exp from "express";
import morgan from "morgan";
import cors from "cors";

const app = exp();
app.use(cors());
app.use(exp.json())
app.use(morgan('dev'));

const PORT = 3000;

const users = [
    { id: 1, name: "muthu" },
    { id: 2, name: "gopi" },
    { id: 3, name: 'emirates' },
    { id: 4, name: 'muthugopi' }
];

const products = [
    { id: 1, name: 'laptop' },
    { id: 2, name: 'headphone' },
    { id: 3, name: 'earbuds' }
];

const s_names = [
    { id: 1, s_name: 'muthugopi' },
    { id: 2, s_name: 'emirates' },
    { id: 3, s_name: 'ayaan' }
];



app.get('/', (req, res) => {
    res.status(200).send({ msg: 'your enter the landing page !!' })
});

app.get('/home', (req, res) => {
    res.status(200).redirect('/')
});

app.get('/api/users', (req, res) => {

    const { query: { filter, value } } = req;
    console.log(filter, value);
    if (filter && value) {
        return res.status(200).send(users.filter((user) => user[filter].toLowerCase().includes(value)))
    }
    res.status(200).send(users);
})

app.get('/api/products', (req, res) => {
    const { query: { filter, value } } = req;
    if (filter, value) {
        return res.status(200).send(products.filter(prop => prop[filter].toString().includes(value)));
    }
    res.send(products);
});

app.get('/api/student_names', (req, res) => {
    const { query: { filter, value } } = req;
    if (filter && value) {
        return res.status(200).send(s_names.filter(s_name => s_name[filter].toString().includes(value)));
    } else if (filter || value) {
        return res.status(404).send({ msg: "bad request" });
    }
    return res.status(200).send(s_names);
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.send({ msg: 'invalid product id' });
    }
    else {
        const product = products.find(prop => prop.id === id);
        if (product)
            return res.send(product);
        else
            return res.send({ msg: 'product not available' })
    }
})

app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send({ msg: 'User Not Found !!' });
    }
});

app.post('/api/user', (req, res) => {
    const { body } = req;
    const exist = users.find(user => user.name == body.name);
    if (exist) {
        return res.status(409).send({ msg: "user alread exist!!" });
    }
    const newUser = { id: users[users.length - 1].id + 1, ...body };
    users.push(newUser);
    return res.status(201).send(newUser)
});

app.put('/api/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("Bad URL!");
    }

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).send("User not found!");
    }

    const { body } = req;
    users[userIndex] = { id: id, ...body };

    res.status(200).send("Updated successfully!");
});

app.patch('/api/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("Bad URL!");
    }

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).send("User not found!");
    }

    const { body } = req;
    users[userIndex] = {...users[userIndex], ...body}
    console.log(body);
})

app.use((req, res) => {
    res.send({ msg: "invalid URL Bruhh" })
})


app.listen(PORT, () => {
    console.log(`server runing at port ${PORT}`)
})