const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use('/uploads', express.static('uploads'));

const MONGO_PW = process.env.MONGO_PW
console.log('Mongo PW: ', MONGO_PW);
mongoose.connect(`mongodb+srv://ndvo:${MONGO_PW}@cluster0.cuppl.mongodb.net/uploadimage?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connected');
}).catch(err => {
    console.log('ERROR: ', err);
})


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors());


// import category route
app.use('/api', require('./routes/category.route.js'));

// Page not found 404
app.use((req, res) => {
    res.status(404).json({
        errors: "page not found"
    });
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

