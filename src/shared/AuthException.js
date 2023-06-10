module.exports = function AuthException() {
  this.message = message;
  this.name = "AuthException";
  this.statusCode = 401;
};
