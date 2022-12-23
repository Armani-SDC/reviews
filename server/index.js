const express = require('express');
const morgan = require('morgan');
const router = require('./router');

const app = express();
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;
app.listen(PORT);

app.use(express.json());

app.use('/', router);

console.log(`Listening at http://localhost:${PORT}`);
