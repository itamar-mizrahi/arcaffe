const express = require("express");
const router = express.Router();
const { google } = require('googleapis');

const key = require("../../key");

router.post("/newSubmit", (req, res) => {
  const { sign } = req.body
  key(signIn, sign);
  res.status(200).json({ success: true });
});

function signIn(auth, sign) {
  const date = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1ZPxr4_WP0pzaxX1ZSIyZikOqGxWiM4tsuXRId1v0rOY';
  let values = [
    [
      sign.name,
      sign.lastname,
      sign.phone,
      sign.company,
      date
    ]
  ];
  const resource = {
    values,
  };

  sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    sheets.spreadsheets.values.update({
      valueInputOption: "USER_ENTERED",
      spreadsheetId,
      range: `A${rows.length}:E`,
      resource,
    }, (err) => {
      if (err) return console.log('The API returned an error: ' + err);
    });
  });
}

module.exports = router;
