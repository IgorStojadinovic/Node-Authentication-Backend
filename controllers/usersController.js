const User = require("../model/User");

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) {
    return res.status(204).json({ message: "No users found!" });
  }
  res.json(users);
};

/***************************************************************************************************************/

//@desc Update user roles
//@route PUT /users
//@access Private
const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required!" });

  const id = req.body.id;

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: `User ID ${id} not found.` });
  }

  const userUpdate = await User.findByIdAndUpdate(id, {
    roles: req.body.roles,
  });

  //Save the changes
  const result = await userUpdate.save();

  res.status(200).json({ message: `User ${user.username} updated!` });
};

/***************************************************************************************************************/

//@desc Delete user
//@route DELETE /users
//@access Private
const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required!" });
  const id = req.body.id;

  //Check if user exists
  const userCheck = await User.findById(id);

  if (!userCheck) {
    return res.status(400).json({ message: `User ID not found.` });
  }

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `User ${userCheck.username} has been deleted.` });
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
