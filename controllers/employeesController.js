const Employee = require("../model/Employee");

//@desc Get all employees
//@route GET /employees
//@access Private
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  if (!employees)
    return res.status(204).json({ message: "No employees found." });

  res.json(employees);
};

/***************************************************************************************************************/

//@desc Create new employee
//@route POST /employees
//@access Private
const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  //Check if user already exists in DB
  const duplicate = await Employee.findOne({
    firstname: req.body.firstname,
  }).exec();

  //If there is a duplicate in DB send json error message
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "User with that name already exists" });
  }

  //If there is no duplicate in DB create new employee object
  try {
    const newEmployee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
  }
};

/***************************************************************************************************************/

//@desc Update employee
//@route PUT /employees
//@access Private
const updateEmployee = async (req, res) => {
  //It can be set set to req.params.id, this below is just for testing
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required!" });

  //Get the id of user
  const id = req.body.id;

  //Find the user with that id in DB
  const employee = await Employee.findById(id).exec();

  //If there is no user with that id send error message
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  //Else update the current employee
  const update = await Employee.findByIdAndUpdate(id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const result = await update.save();

  res.status(200).json({ message: `User ${employee.firstname} updated !` });
};

/***************************************************************************************************************/

//@desc Delete employee
//@route DELETE /employees
//@access Private
const deleteEmployee = async (req, res) => {
  //It can be set set to req.params.id, this below is just for testing
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required!" });

  //Get id
  const id = req.body.id;

  //Find employee
  const employee = await Employee.findById(id);

  //If there is no employe
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  try {
    //Delete the current employee
    const deleteEmploye = await Employee.findByIdAndDelete(id);

    return res.status(200).json({ message: `User with id:${id} deleted` });
  } catch (error) {
    return res.jon({ message: error });
  }
};

/***************************************************************************************************************/

//@desc Get single employe
//@route GET /employees
//@access Private
const getEmployee = async (req, res) => {
  //It can be set set to req.params.id, this below is just for testing
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID required." });
  const id = req.params.id;

  const employee = await Employee.findOne({ _id: id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  deleteEmployee,
  updateEmployee,
};
