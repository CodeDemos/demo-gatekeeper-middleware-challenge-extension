const express = require('express');
const queryString = require('query-string');

const app = express();

const USERS = [
  {id: 1,
   firstName: 'Joe',
   lastName: 'Schmoe',
   userName: 'joeschmoe@business.com',
   position: 'Sr. Engineer',
   isAdmin: true,  
   password: 'password',
   token: null
  }, 
  {id: 2,
   firstName: 'Sally',
   lastName: 'Student',
   userName: 'sallystudent@business.com',
   position: 'Jr. Engineer',
   isAdmin: true,
   password: 'password',
   token: null
  },
  {id: 3,
   firstName: 'Lila',
   lastName: 'LeMonde',
   userName: 'lila@business.com',
   position: 'Growth Hacker',
   isAdmin: false,
   password: 'password',
   token: null
  },
  {id: 4,
   firstName: 'Freddy',
   lastName: 'Fun',
   userName: 'freddy@business.com',
   position: 'Community Manager',
   isAdmin: false,
   password: 'password',
   token: null
  }
];


function gateKeeper(req, res, next) {
  const token = parseFloat(req.get('x-user-token'));  
  req.user = USERS.find((usr, index) => usr.token === token);
  if (!req.user) {
    return res.sendStatus(403);
  }
  next();
}

app.post("/api/login", (req, res) => {
  /* TODO: 
      - Retrieve and parse the `x-username-and-password` header
      - Attempt to find a user with matching username and password
      - If user match NOT found then send status 401 (unauthorized)
      - If user match IS found then create a token `uuidv4()`, save it to the user
      - And then return the token to the client as json: `{ token : 'A1B2-C3D4-E5F6' }`
  */
});

app.get("/api/users/me", gateKeeper, (req, res) => {
  const {firstName, lastName, id, userName, position} = req.user;
  res.json({firstName, lastName, id, userName, position});
});

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
