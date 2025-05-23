const userModel = require("../modal/userModal");
const bcrypt = require("bcrypt");

const createAdminIfNotExists = async () => {
  try {
    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        email,
        password: hashedPassword,
      });
      console.log("Admin Created Successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.log(" Error creating admin:", error);
  }
};

module.exports = { createAdminIfNotExists };
