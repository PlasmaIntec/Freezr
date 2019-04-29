const MongoClient = require('mongodb').MongoClient;
const { MLAB_USERNAME, MLAB_PASSWORD, MLAB_DATABASE } = require('../../config.js');

const url = `mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}@ds145916.mlab.com:45916/${MLAB_DATABASE}`;
const options = { useNewUrlParser: true};

const connect = () => {
	return new Promise((resolve, reject) => {	
		MongoClient.connect(url, options, (err, client) => {
			if (!err) {	 
                resolve(client.db(MLAB_DATABASE));	
			} else {
                reject(err);
			}
		});
	});
};

const getLink = (short) => {
	return new Promise((resolve, reject) => {
		connect()
		.then(db => {
			db.collection('links').findOne({ 'short': short }, (error, result) => {
				if (error || !result) reject(error);
				else resolve(result);
			});
		})
		.catch(err => console.error(err))
	});
}

const getAllLinks = () => {
	return new Promise((resolve, reject) => {
		connect()
		.then(db => {
			db.collection('links').find().toArray((error, result) => {
				if (error || !result) reject(result);
				else resolve(result);
			});
		})
		.catch(err => console.error(err))
	});
}

const addLink = (info) => {
	console.log('info:', info) // TODO
	return new Promise((resolve, reject) => {
		connect()
		.then(db => {
			db.collection('links').insertOne({
                full: info.full,
                short: info.short
			}, (error, result) => {
				if (error) reject(error);
				else resolve(result);
			});		
		})
		.catch(err => console.log(err))		
	});
};

connect()
.then(() => {
	console.log('Connected to mLab');
})
.catch(err => {
    console.log(url)
	console.log('Failed to connect to mLab:', err);
})

module.exports = { getLink, getAllLinks, addLink };