
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let users = [{
  id: "1",
  name: "Ahsan Ayaz",
  email: "ahsan.ayaz@iomechs.com"
}, {
  id: "2",
  name: "Siraj Ul Haq",
  email: "sirajulhaq@koderlabs.com"
}, {
  id: "3",
  name: "Asaad Mahmood",
  email: "asaad@mattermost.com"
}];
let id = users.length + 1;
/** increment id and attach it to request object */
updateId = () => {
  return (req, res, next) => {
    id = users.length + 1;
    req.body.id = id + '';
    next();
  }
}

/** get id param
 * find matching user and attach it to request object
 */
app.param('id', (req, res, next, userId) => {
  let user = _.find(users, { id: userId });
  let userIndex = _.findIndex(users, { id: userId });
  if(user){
    req.user = user;
    req.userIndex = userIndex;
    next();
  } else {
    res.status(400).json({});
  }
})

app.get('/user', (req, res) => {
  res.json(users);
});

app.get('/user/:id', (req, res) => {
  res.json(req.user || {});
});

app.post('/user', updateId(), (req, res) => {
  let user = req.body;
  users.push(user);
  res.json(user);
});

app.put('/user/:id', (req, res) => {
  let update = req.body;
  if(!users[req.userIndex]) {
    res.json({});
  } else {
    /** assign will extend current user item with posted update
     *  assign extend from right to left
     * */
    let updateduser = _.assign(users[req.userIndex], update);
    res.json(updateduser);
  }
});

app.delete('/user/:id', (req, res) => {
  if (!users[req.userIndex]) {
    res.json({});
  } else {
    let user = users[req.userIndex];
    users.splice(req.userIndex, 1);
    res.json(req.user);
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});