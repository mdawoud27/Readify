const logger = (req, res, next) => {
  console.log(
    `Request method is: ${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`
  );
  next();
};

module.exports = { logger };
