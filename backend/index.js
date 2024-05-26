const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const auth=require('./routes/auth')

app.use(cors());
app.use(express.json());
app.use(auth)


app.listen(3000, () => {
    console.log("Listening on port 3000");
});

mongoose.connect(process.env.uri).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});

