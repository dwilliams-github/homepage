# Backend

This is slashdave's backend.

## Technology

 * [Node.js](https://nodejs.org/en/)
 * [MongoDB](https://www.mongodb.com/)

## Client javascript

See the client directory above this one. All content in ```public/js``` is generated.

## Deployment

For manual deployment, simply run ```server.js``` on node:

```
> nodemon server.js
```

## AWS

For aws deployment, zip the root directory. The result is ready to be deployed
on a standard node environment.

```
cd backend
zip -r ../backend.zip . -x 'node_modules/*'
```
