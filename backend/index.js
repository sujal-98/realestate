const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const usercontrol=require('./controllers/usercontrol')
const auth=require('./routes/auth')

app.use(cookieParser())
app.use(cors(
    {
        origin: 'http://localhost:3001',
        credentials: true
    }
));
app.use(express.json());
app.use(auth)
app.use(usercontrol)

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

mongoose.connect(process.env.uri).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});

