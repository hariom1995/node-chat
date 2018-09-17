const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(publicPath);

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('local host 3000 is working');
});