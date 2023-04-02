const User = require("../model/User");

const handleLogout = async (req, res) => {
  //On clinet also delet accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content to send back
  const refreshToken = cookies.jwt;

  //Check if refresh token is in db?
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  //If there is no user with that refresh token remove the cookie with jwt token
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
    });
    return res.sendStatus(204);
  }

  //Delete refreshToken
  foundUser.refreshToken = "";
  //Save the changes to user
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //Secure :true -only serves on https
  res.sendStatus(204); //All is well but no content to send;
};

module.exports = { handleLogout };
