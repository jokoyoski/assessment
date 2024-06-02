const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');
const { getAlbumsByArtist }= require('./controller/album.js');

config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.get('/albums/:artist', getAlbumsByArtist);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = { app };
