const axios = require("axios");
const { config } = require("dotenv");
const { sendResponse } = require("../handler/response.js");

config();

const itunesApiUrl = process.env.ITUNES_API_URL;

const getAlbumsByArtist = async (req, res) => {
  const artist = req.params.artist;
  try {
    const response = await axios.get(
      `${itunesApiUrl}?term=${artist}&entity=album`
    );
    let albums = response.data.results;
    let uniqueAlbums = {};

    albums.forEach((album) => {
      uniqueAlbums[album.collectionName] = album;
    });

    sendResponse(
      res,
      200,
      "Albums fetched successfully",
      Object.values(uniqueAlbums)
    );
  } catch (error) {
    sendResponse(res, 500, "An error occurred while fetching albums", null);
  }
};

module.exports = { getAlbumsByArtist };
