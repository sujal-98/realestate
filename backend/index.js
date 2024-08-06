const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Saved=require('./controllers/savingControl')
const usercontrol=require('./controllers/usercontrol')
const propControl=require('./controllers/propertycontrol')
const auth=require('./routes/auth')



app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: 'http://localhost:3001',
        credentials: true
    }
));
app.use('/save',Saved)
app.use(express.json());
app.use(auth)
app.use(usercontrol)
app.use(propControl)

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

mongoose.connect(process.env.uri).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});

