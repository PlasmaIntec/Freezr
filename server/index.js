const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const public = path.join(__dirname, '../public');

app.use(morgan('dev'));
app.use('/', express.static(public));

app.get('/*', (req, res) => { // FIXES "cannot GET /URL" on refresh with React Router
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/physicians', (req, res) => {
	const physicians = list.map(physician => ({
		id: physician.id,
		name: physician.name,
	}))
	res.send(physicians);
})

app.post('/appointments', parser.json(), (req, res) => {
	const appointments = list.find(physician => physician.name === req.body.name);
	res.send(appointments);
})

app.listen(port, () => {
  console.log(`Express server for Freezr running at: http://localhost:${port}`);
});