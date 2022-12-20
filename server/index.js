const express = require('express');

const app = express();
app.use(express.json());

// app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;
app.listen(PORT);

console.log(`Listening at http://localhost:${PORT}`);
