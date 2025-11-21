require('dotenv').config();
const app = require('./app.js');


const port = process.env.PORT || 3333;
app.listen(port, ()=> {console.log(`SEVER RUNING ON PORT ${port}`)});