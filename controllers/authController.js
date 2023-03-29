const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// return the status if the user if an admin
const isAdmin = async (req, res) => {
  const { loggedInUserId } = req.body;
  // console.log(loggedInUserId)
  try {
    const user = await User.findById(loggedInUserId);
    return res.status(200).json({
      role: user.userRole,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error: err,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.json({ users: allUsers });
  } catch (err) {
    res.status(404).json({
      message: "something went wrong",
    });
  }
};
const signup = async (req, res) => {
  const { name, email, password, cPassword, role } = req.body;

  if (!name || !email || !password || !cPassword || !role) {
    return res.status(400).json({
      message: "all fields are necessary",
    });
  }
  if (password !== cPassword) {
    return res.status(400).json({
      message: "password Mismatch",
    });
  }

  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res.status(400).json({
        message: "Email already taken!",
      });
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      userRole: role,
    });

    const createdUser = await user.save();

    return res.status(200).json({
      user: createdUser,
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(200).json({
      error: err,
    });
    console.log(err);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    return res.status(400).json({
      message: "Fields can not be empty",
    });
  }
  // if(role === "admin") {
  //     isAdmin(req, res){

  // }
//   console.log(role);

  try {
    const data = await User.findOne({ email: email });
    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log(data);
    // if (role !== data.userRole) {
    //   return res.status(400).json({
    //     message: "Role Mismatched",
    //   });
    // }
    const login = await bcrypt.compare(password, data.password);
    if (login) {
      const token = jwt.sign(
        {
          _id: data._id,
          role: data.userRole,
        },
        process.env.JWT_SECRET
      );
      const encode = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({
        token: token,
        user: { ...encode, name: data.name, role: data.userRole },
      });
    }
    return res.status(400).json({
      message: "Password Mismatch",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signup,
  signin,
  isAdmin,
  allUsers,
};
