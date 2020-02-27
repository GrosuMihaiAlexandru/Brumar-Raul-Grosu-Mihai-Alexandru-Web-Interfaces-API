const uuidv4 = require('uuid/v4');

let users = [
  {
    id: "3e9141c1-a64b-4b54-8879-284a7d04e735",
    username: 'tester',
    email: 'tester@mail.com',
    password: '$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou' // testerpassword
  },
  {
    id: "dc7015c4-1523-41fe-b322-0eacaeec9b80",
    username: "johndoe",
    email: 'john@mail.com',
    password: '$2y$06$eQav1OaIyWSUnlvPSaFXRe5gWRqXd.s9vac1SV1GafxAr8hdmsgCy' // johndoepassword
  },
];

module.exports = {
  getUserById: (id) => users.find(u => u.id == id),
  getUserByName: (username) => users.find(u => u.username == username),
  addUser: (username, email, password) => {
    users.push({
      id: uuidv4(),
      username,
      email,
      password
    });
  }
}