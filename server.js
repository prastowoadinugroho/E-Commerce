const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//Insert with raw json
app.use(bodyParser.json());

require('dotenv').config({
    path: './config/index.env'
});

const connDB = require('./config/db');
connDB();

app.use(morgan('dev'));
app.use(cors());

app.use('/api/user/', require('./routes/auth_route'));
app.use('/api/category/', require('./routes/category_route'));
app.use('/api/product/', require('./routes/product_route'));

app.get("/",(req,res) => {
    res.send('tes => home page');
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Page Not Found'
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
});