# Freezr
## *URL Shortener*
### Usage Instructions
Create a config.js
```bash
touch config.js
```
Add [mLab](mlab.com) login information
```js
module.exports = {
	MLAB_USERNAME: 'USERNAME', 
	MLAB_PASSWORD: 'PASSWORD', 
	MLAB_DATABASE: 'DATABASE'
};
```
Build and run
```bash
npm install
npm run build
npm start
```
