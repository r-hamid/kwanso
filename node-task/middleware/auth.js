require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  checkForAuth(req, res, next) {
    let token = req.headers.authorization;
    if(!token) return res.status(400).json({ status: false, message: "unauthorized" });
    token = token.split(" ")[1];
    const data = jwt.verify(token, process.env.SECRET);
    const { userId } = data || {};
    if(!userId) res.status(400).json({ status: false, message: "unauthorized" });
    req.session_data = {};
    Object.assign(req.session_data, {
      userId
    })
    next();
  },
  generateToken(userId) {
    const expiresIn = 60 * 60 * 24;
    const token = jwt.sign({
      userId,
      issuedOn: new Date(),
      expiresIn
    }, process.env.SECRET, {
      expiresIn
    });
    return token;
  }
}