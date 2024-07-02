const express = require("express")
const jwt = require("jsonwebtoken")

const jwtPassword = "123456";
const port = 3000;

const app = express();



const ALL_USERS = [
  {
    username : "supraj",
    password : "gibberish1",
    name : "Supraj Gijre"
  },

  {
    username : "Anaya",
    password : "gibberish2",
    name : "Anaya Darwhekar"
  },

  {
    username : "Jai",
    password : "gibberish3",
    name : "Jai Suklikar"
  }
]

function userExists(username, password) {
  
  const n = ALL_USERS.length;



  for(let i = 0 ; i < n ; i++) {

    if(ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
      console.log(`Welcome ${ALL_USERS[i].name} !`);
      return true;
    }

  }

  return false;
}

app.use(express.json());

app.post('/signin', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  

  if(!userExists(username, password)) {
    return res.status(403).json({
      msg:"User does not exist in our database"
    })
  }

  var token = jwt.sign({ username : username }, jwtPassword);

  res.json({
    token : token
  });

});



app.get('/users', (req, res) => {
  const token = req.headers.authorization;
  let username = " "
  try {
    const decoded = jwt.verify(token, jwtPassword);
    username = decoded.username;
    console.log(username);
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid token"
    });
  }
  
  res.status(200).json({
    users : ALL_USERS.filter((value) => {
      return value.username !== username
    })
  })

});

app.listen(port);