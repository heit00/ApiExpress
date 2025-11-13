const app = require('./app.js');
require('dotenv').config();

const port = process.env.PORT || 3333;
app.listen(port, ()=> {console.log('SEVER RUNING ON PORT 3333')});