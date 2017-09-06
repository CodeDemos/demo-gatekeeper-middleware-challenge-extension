# Challenge: Gatekeeper middleware *extension*

This is an extension to the GateKeeper Middleware challenge

In the previous version of Gatekeeper Middleware (in the curriculum), the username and password was passed with every request. This is fine for demo purposes but in-the-wild it is a potential security concern, so in the version we will swap-out the credentials for a token.

Your challenge will be to implement the `/api/login` endpoint. If you get stuck, you can refer to the `solution.js` file.

NOTES: 
- Before starting, be sure to "Remix" this project. 
- Remember, as you make changes like adding `console.log()` glitch will restart the server and temporary properties **like tokens** will be reset.

The User's flow:
- Make a `GET` request to the `/api/users/me`. Since we are not passing a username and password, yet, the request will not be rejected and you will receive a HTTP status 403 (Forbidden).

```
curl https://<YOUR-PROJECT>.glitch.me/api/users/me
```

- Make a `POST` request to `/api/login` with the username and password in the `x-username-and-password` header like: `user=user@somewhere.com&pass=password`
The endpoint should parse the header and attempt to find a user with that username and password. If a match is found, it should create a UUID token and save it to the user and return the token to the browser (or postman). If no match is found, then send a status 401 (Unauthorized)

```
curl -X POST https://gatekeeper-middleware-extension-challenge.glitch.me/api/login \
  -H 'x-username-and-password: user=sallystudent@business.com&pass=password'
```

- Finally, make another `GET` request to `/api/users/me` but this time remove the `x-username-and-password` header and add a `x-user-token` header with the value you received above.  The Gatekeeper Middleware will parse and validate the token AND set `req.user` to the authenticated user. The endpoint will be authenticated and return the first name, last name, user name, id, and position (aka job title) of the user. 

```
curl https://gatekeeper-middleware-extension-challenge.glitch.me/api/users/me \
  -H 'x-user-token: A1B2-C3D4-E5F6'
```