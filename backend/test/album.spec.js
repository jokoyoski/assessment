const assert = require('assert');
const supertest = require('supertest');
const { app } = require('../server.js');
const nock = require('nock');

const request = supertest(app);

describe('GET /albums/:artist', () => {
  let originalEnv;

  beforeEach(() => {
    // Save the original environment variable value
    originalEnv = process.env.ITUNES_API_URL;
    // Set the desired value for the environment variable
    process.env.ITUNES_API_URL = 'https://itunes.apple.com/search';
  });

  afterEach(() => {
    // Clean up after each test
    nock.cleanAll();
    // Restore the original value of the environment variable
    process.env.ITUNES_API_URL = originalEnv;
  });

  it('should return albums for a valid artist', async () => {
    const artist = 'coldplay';
    const apiResponse = {
      resultCount: 2,
      results: [
        {
          collectionName: 'Album 1',
          collectionId: 1
        },
        {
          collectionName: 'Album 2',
          collectionId: 2
        }
      ]
    };

    // Mock the iTunes API response
    nock(process.env.ITUNES_API_URL)
      .get(`?term=${artist}&entity=album`)
      .reply(200, apiResponse);
  
    const res = await request.get(`/albums/${artist}`);
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.body.data));
    assert.strictEqual(res.body.data.length, 2);
    assert.strictEqual(res.body.data[0].collectionName, 'Album 1');
    assert.strictEqual(res.body.data[1].collectionName, 'Album 2');
  });

  it('should return an empty array if no albums are found', async () => {
    const artist = 'unknownartist';
    const apiResponse = {
      resultCount: 0,
      results: []
    };

    // Mock the iTunes API response
    nock(process.env.ITUNES_API_URL)
      .get(`?term=${artist}&entity=album`)
      .reply(200, apiResponse);

    const res = await request.get(`/albums/${artist}`);

    assert.strictEqual(res.body.status, 200);
    assert(Array.isArray(res.body.data));
    assert.strictEqual(res.body.data.length, 0);
  });

  it('should return a 500 status code if there is an error with the API', async () => {
    const artist = 'errorartist';

    // Mock the iTunes API to return an error
    nock(process.env.ITUNES_API_URL)
      .get(`?term=${artist}&entity=album`)
      .reply(500);

    const res = await request.get(`/albums/${artist}`);

    assert.strictEqual(res.status, 500);
    assert.strictEqual(res.body.status, 500);
    assert.strictEqual(res.body.message, 'An error occurred while fetching albums');
  });
});
