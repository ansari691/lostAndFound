const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running successfully at port ${PORT}`));

app.get('/',(req,res) => res.send("app running"));

app.use(express.json());
app.use(express.static('uploads'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Accept, Content-Type, Authorization, x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
})

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));


connectDB();