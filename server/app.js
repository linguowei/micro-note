const express = require('express');
const read = require('node-readability');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

const app = express();

var resolve = file => path.resolve(__dirname, file);
app.use(compression());
app.use(express.static(resolve('../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generateNote', function (req, res) {
  read(req.body.link, (err, article, meta) => {
    if (err) {
      res.status(500);
      return;
    }
    res.json({
      title: article.title,
      content: article.content
    })
    article.close();
  });
});

app.get('*', function(req, res) {
  const html = fs.readFileSync(resolve('../dist/' + 'index.html'), 'utf-8');
  res.send(html)
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});