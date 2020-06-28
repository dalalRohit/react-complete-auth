var express = require("express");
var router = express.Router();
const auth = require("./../utils/auth");
const User = require("./../models/userModel");
var bcrypt = require("bcryptjs");
const { regValidation, loginValidation } = require("./../utils/validation");

//POST /register
router.post("/register", (req, res, next) => {
  let { username, email, password, password2 } = req.body;

  //validate the uesr
  const { error } = regValidation(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  User.findOne({ username })
    .then((user) => {
      //If User found
      if (user) {
        if (user.email === email)
          return res.send({
            msg: `User with email ${email} and username ${username} already exists.`,
          });
        return res.send({
          msg: `User with username ${username} already exists!`,
        });
      } else {
        const newUser = new User({
          username,
          email,
          password,
        });

        //hashing password
        bcrypt.genSalt(10, async (error, salt) => {
          if (error) return res.status(400).send(err);

          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) return res.status(400).send(err);

            newUser.password = hash;

            try {
              const token = await newUser.generateAuthToken();
              res.header("auth-token", token);
            } catch (err) {
              res.status(400).send(err);
            }

            return res.status(201).send({ newUser });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

//POST /login
router.post("/login", (req, res, next) => {
  let { username, password } = req.body;

  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  User.findOne({ username }).then(async (user) => {
    if (!user) {
      return res.send({ error: `User not found!` });
    }

    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(400).send({ error: "Passwords do not match!" });
    }
    const token = await user.generateAuthToken();

    res.header("auth-token", token);
    
    res.send({
      msg: "login",
      user:user['_id'],
    });
  });
});

//Sample protected route
router.get("/test", auth, (req, res) => {
  res.send({
    msg: "Success",
    user: req.user,
  });
});

//Logout
router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.status(200).send("Logout");
  } catch (err) {}
});

//LogoutAl
router.get("/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).send("LogoutAll");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
