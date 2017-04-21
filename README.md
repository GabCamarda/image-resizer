## Image Resizer (Coding Test - UB)
Node.js webservice to resize images

### Usage
#### Server
Fork, clone or download zip from github, install dependencies with `npm install` and run with `npm start`
Please check the config files and change values where appropriate to suit your needs. 

**In particular you might want to change the database index for Redis to avoid conflicts with already present databases.**

You can use the `PORT` environment to change it. It defaults to `1337` 

#### Client
Access your host on the port specified (`1337` for default) and hit the endpoint `/resize`.
It accepts up to 3 parameters: `width`, `height`, `url`. `width` and `url` are mandatory.
If `height` is not specified, the picture will be resized keeping proportions, using ratio.

Example:
```javascript
curl "http://localhost:1337/resize?width=200&heigth=200&url=[PICTURE URL HERE]"
```

### Test
Mocha is used for testing. Run `npm test`.