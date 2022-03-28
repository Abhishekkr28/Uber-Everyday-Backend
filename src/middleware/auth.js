const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { phone } = req.query;
    const user = await User.findOne({
      phone,
    });

    // console.log(user);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Please authenticate");
  }
};

module.exports = auth;
