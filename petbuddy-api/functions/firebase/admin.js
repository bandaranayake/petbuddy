const firebase = require("firebase-admin");
const dotenv = require('dotenv');
const credentials = require("../credentials.json");

dotenv.config();

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});

module.exports = firebase;
