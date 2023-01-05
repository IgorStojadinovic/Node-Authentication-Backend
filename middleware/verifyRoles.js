//Function checks  user roles [User,Admin,Editor] and compares them to req.roles that are sent
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    //console.log("Looking for these roles:", rolesArray);
    //console.log("Role sent:", req.roles);

    //Map over req.roles, find if it inclues true
    const result = req.roles
      .map((role) => rolesArray.includes(role)) // This returns for example [true,true,false] [User,Admin,Editor]
      .find((value) => value === true); // Find if there is any value that is true

    //If no result
    if (!result) return res.sendStatus(401);

    //If everything is ok, call next middleware function  in stack. get,post,put,delete function, etc...
    next();
  };
};

module.exports = verifyRoles;
