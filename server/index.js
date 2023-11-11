const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./controllers/userController');
const collectionController = require('./controllers/collectionController');
const bookshelfController = require('./controllers/bookshelfController');


require("dotenv").config(); 

const {PORT} = process.env;
app.use(express.json());
app.use(cors());

app.post('/signup', userController.signup);
app.post('/login', userController.login);

app.post('/collection', collectionController.collectionSubmit)
app.post('/bookshelf', bookshelfController.bookshelfSubmit)

app.get('/collection', collectionController.getQuotes)
app.get('/bookshelf', bookshelfController.getArticles)


app.listen(PORT, console.log(`Running on port ${PORT}`));