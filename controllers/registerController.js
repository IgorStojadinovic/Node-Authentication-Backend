const User = require("../model/User");

const bcrypt = require("bcrypt");

//Register user
const handleNewUser = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });
  }

  //Check for duplicate in MongoDB
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.status(409); //Confilct
  try {
    //Encrypt the password
    const hashedPwd = await bcrypt.hash(password, 13);

    //Create and store new user
    const newUser = await User.create({
      username: user,
      roles: { User: 2001 }, //Default role
      password: hashedPwd,
    });

    console.log(newUser);
    res.status(200).json({ message: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
