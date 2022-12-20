const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());

// app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;
app.listen(PORT);

app.use(express.json());

app.use('/', router);

console.log(`Listening at http://localhost:${PORT}`);
