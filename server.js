 
const express = require('express');
require('dotenv').config();

const myRouter = require('./src/router/router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(myRouter);


app.listen(process.env.APP_PORT, () => {
    console.log(`Server started at port ${process.env.APP_PORT}`);
})
