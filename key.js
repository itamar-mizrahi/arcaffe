const fs = require('fs');
const {google} = require('googleapis');

const TOKEN_PATH = 'token.json';

function key (theFunc, sign) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), theFunc, sign);
  });
}

function authorize(credentials, callback, sign) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, sign);
  });
}

module.exports = key;