const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Create new employee
//@route POST /auth
//@access Private
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user | !pwd) {
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });
  }

  //Find the user that is sent in DB
  const foundUser = await User.findOne({ username: user }).exec();

  //If there is no user
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  //Else evaluate password with bcrypt
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    //Grab the roles
    const roles = Object.values(foundUser.roles);

    //Create JWT
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      //In production set like 5min ~15min
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      //Refresh token needs to last a lot longer than  accessToken, here it's set to 1 day.
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();
    //console.log(result);

    // Send Access Token , do not save access token into localstorage. Just in memory, state etc...
    // Send it as cookie, but only as http which is not available to javascript
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      //If your testing Refresh cookie with Thunder Client just remove secure:true. It wont send the cooke if it's enabled.
      //secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};

module.exports = { handleLogin };
