const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../modal/userModal");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginAdmin };
