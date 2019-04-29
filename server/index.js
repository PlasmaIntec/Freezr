const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const routes = require('./controllers');

const app = express();
const port = process.env.PORT || 3000;

const public = path.join(__dirname, '../public');

app.use(morgan('dev'));
app.use('/', express.static(public));

app.get('/links/:short', routes.getLink);

app.get('/links', routes.getAllLinks);

app.post('/links', parser.json(), routes.addLink);

app.get('/*', (req, res) => { // FIXES "cannot GET /URL" on refresh with React Router
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, () => {
  console.log(`Express server for Freezr running at: http://localhost:${port}`);
});