const db = require('../models');

const routes = {
	getLink: (req, res) => {
		db.getLink(req.params.short)
		.then(link => res.status(200).send(link))
		.catch(err => res.status(404).send('Link Not Found'))
	},
	getAllLinks: (req, res) => {
		db.getAllLinks()
		.then(links => res.status(200).send(links))
		.catch(err => res.status(404).send('No Links'))
	},
	addLink: (req, res) => {
		db.addLink(req.body)
		.then(name => res.status(201).send(`ADDED: ${req.body}`))
		.catch(err => res.status(404).send('Cannot Add Link'))
	}
};

module.exports = routes;