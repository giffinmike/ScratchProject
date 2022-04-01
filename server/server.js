const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  const fileName = path.resolve(__dirname, '../client/index.html');
  res.sendFile(fileName, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('sent');
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});