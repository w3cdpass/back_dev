const express = require('express');
const connectionDB = require('./dbconn')

connectionDB('mongodb://localhost:27017/authR').then(() => console.log("Db connected")
);
const PORT = 3000;
const app = express();
app.listen(PORT, () => console.log(`server listen on http://localhost:${PORT}`));
