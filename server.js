'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes')
const express = require('express')
const DB = require('./config/db');

DB();

const properties = require('./config/properties')
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bodyParserJSON =  bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());
app.use('/api', router);
authRoutes(router);
router.get('/',(req, res)=>{
    res.send('HI server UP')
});

app.use(router);
app.listen(properties.PORT, ()=>console.log(`server running on port ${properties.PORT}`));
