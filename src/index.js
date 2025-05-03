const express = require('express');
const app = express();
// const port = 3000;
const db = require('./config/dbconfig');
const cors = require('cors');
const Router = require('./router/main');
db.connect();

app.use(cors({
    origin: 'http://shineluxstore.infinityfreeapp.com'  // hoặc '*' cho phép tất cả
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Router(app);

app.listen(3000, () => {
    console.log('Server is running on port https://shinelux.up.railway.app');
})


