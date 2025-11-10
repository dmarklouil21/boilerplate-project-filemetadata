// index.js
var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML upload form
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer for file uploads (no disk storage needed)
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/fileanalyse
// The form input name must be 'upfile'
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
