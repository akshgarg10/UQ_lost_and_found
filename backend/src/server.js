const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const db=mongoose.connection
db.once('open', () => console.log("Connected to db"))

const origins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));

app.use(express.json());


// Added router for items
const itemsRouter = require('./routes/items')
app.use('/api', itemsRouter)

// Added router for login func
const loginRouter = require('./routes/login')
app.use('/api', loginRouter)

app.get('/', (req, res) => res.send('ok'));
app.get('/healthz', (req, res) => res.send('ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log("Server started");
});
