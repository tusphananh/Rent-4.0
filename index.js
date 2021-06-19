const express = require("express");
const app = express();
const http = require("http").Server(app);
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const randomjwt = require("jsonwebtoken");
const mongo = require("./mongo.js");
const e = require("express");
const secret = "thisissosecret@sosecret.com.vn";
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/search", (req, res) => {
   
    res.sendFile(__dirname + "/public/Searching/html/searching.html");
});


app.post("/api/signup", async (req, res) => {
  const data = req.body;
  if (data.name === "") {
    res.json({ status: "error", error: "Fill In Your Name" });
  } else if (isNaN(data.phone) || data.phone.length !== 10) {
    res.json({ status: "error", error: "Invalid Phone Number" });
  } else if (data.password === "") {
    res.json({ status: "error", error: "Fill In Your Password" });
  } else {
    bcrypt.hash(data.password, saltRounds, async function (err, hash) {
      data.password = hash;

      try {
        const response = await mongo.createUser(data);

        console.log("User created successfully ", response);
        res.json({ status: "success", error: "Sign Up Success" });
      } catch (err) {
        console.log("User created fail ");

        if (err.code === 11000) {
          res.json({ status: "error", error: "Phone number already in use" });
        }
        res.json({ status: "error", error: "Something goes wrong" });
        console.log(error.message);
      }
    });
  }
});
app.post("/api/signin", async (req, res) => {
  const data = req.body;

  if (isNaN(data.phone) || data.phone.length !== 10) {
    res.json({ status: "error", error: "Invalid Phone Number" });
  } else if (data.password === "") {
    res.json({ status: "error", error: "Fill In Your Password" });
  } else {
    try {
      const response = await mongo.findUser(data);

      bcrypt.compare(data.password, response.password).then(async function (result) {
        if (result) {
          console.log("User sign in successfully ", response);
          const user = {
            _id : response._id,
            phone : response.phone,
            name : response.name
          }
         
              res.json({ status: "success", error: "Sign In successfully" ,user : user });
        } else {
          console.log("User sign in fail ", response);
          res.json({ status: "error", error: "Wrong Password" });
        }
      });
    } catch (err) {
      console.log("User sign in fail ");

      res.json({ status: "error", error: "Phone Number Is Not Registered" });
      console.log(error.message);
    }
  }
});
app.get("/get-started", (req, res) => {
  res.sendFile(__dirname + "/public/Login/index.html");
});

app.get("/homepage", (req, res) => {
  res.sendFile(__dirname + "/public/HomePage/html/homepage.html");
});

app.get("/", (req, res) => {
  res.redirect("/homepage");
});

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const searchs = [];

io.on("connect", (socket) => {
  console.log(socket.id + " has been connected");
  for (let i = 0; i < searchs.length; i++) {
    io.to(socket.id).emit("noti", searchs[i]);
  }
  socket.on("remove-search", (data) => {
    removeSearchs_by_activityToken(data.activityToken);
    io.emit("remove-search", data);
  });

  socket.on("disconnect", function () {
    console.log(socket.id + " has been disconnected");

    const search = searchs[getIndex_by_socketID(socket.id)];
    if (search) {
      removeSearchs_by_socketID(socket.id);
      io.emit("remove-search", search);
    }

    io.emit("remove-result", {
      socketID: socket.id,
    });
  });

  socket.on("search", (data) => {
    addSearchs(data);
    io.emit("noti", data);
  });

  socket.on("resend", (data) => {
    io.to(data.socketID).emit("noti", data.data);
  });

  socket.on("result", (data) => {
    io.to(data.search.socketID).emit("result", data.result);
  });

  socket.on("activities", (data) => {
    io.to(data.guestSocketID).emit("activities", data);
  });

  socket.on("message", (data) => {
    console.log(`send message to ${data.socketID}`);
    io.to(data.socketID).emit("message", data);
  });
});

http.listen(PORT, () => console.log(`listening on ${PORT}`));

function getIndex(item) {
  for (let i = 0; i < searchs.length; i++) {
    if (item.activityToken === searchs[i].activityToken) {
      return i;
    }
  }
  return -1;
}

function addSearchs(item) {
  searchs.push(item);
}

function getIndex_by_socketID(socketId) {
  for (let i = 0; i < searchs.length; i++) {
    if (searchs[i].socketID === socketId) {
      return i;
    }
  }
  return -1;
}
function getIndex_by_activityToken(activityToken) {
  for (let i = 0; i < searchs.length; i++) {
    if (searchs[i].activityToken === activityToken) {
      return i;
    }
  }
  return -1;
}

function removeSearchs_by_socketID(socketId) {
  var index = getIndex_by_socketID(socketId);
  if (index !== -1) {
    searchs.splice(index, 1);
    return true;
  }
  return false;
}

function removeSearchs_by_activityToken(activityToken) {
  var index = getIndex_by_activityToken(activityToken);
  if (index !== -1) {
    searchs.splice(index, 1);
    return true;
  }
  return false;
}
