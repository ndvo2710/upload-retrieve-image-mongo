
const Category = require('../models/category.model.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


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


console.log('------------sendFileToMongoose------------');
let name = 'testing.jpg';
let image = 'uploads/testing.jpg';

const category = new Category({
    name: name,
    image: image
});

console.log('category: ', category);

category.save((err, category) => {
    if (err) {
        console.log('Error: ', err);
    } else {
        console.log('Success');
    }
});

