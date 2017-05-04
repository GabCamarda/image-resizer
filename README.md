## Image Resizer (Coding Test)
Node.js webservice to resize images

### Requirements
 - Node.js >= 6.10
 - Redis >= 3.2.x

### Usage
#### Server
Fork, clone or download zip from Github, install dependencies with `npm install` and run with `npm start`
Please check the config files in `config/` and change values where appropriate to suit your needs. 
- `config/dev.js` is used for testing and development
- `config/index.js` will be used in production

**In particular you might want to change the database index for Redis to avoid conflicts with already present databases you might have.**

The port the server listens to can be changed using `PORT` on the `package.json` or from console. 
It defaults to `1337`.

#### Client
Access your host on the port specified (`1337` for default) and hit the endpoint `/resize`.
It accepts up to 3 parameters: `width`, `height`, `url`. `width` and `url` are mandatory.
If `height` is not specified, the picture will be resized keeping proportions, using ratio.

Example:
```javascript
curl -O "http://localhost:1337/resize?width=200&heigth=200&url=[PICTURE URL HERE]"
```

### Test
Mocha is used for testing. Run `npm test`.
