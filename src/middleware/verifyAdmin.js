import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).send({ message: "Access Denied! No token Provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).send({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};

export { verifyAdmin };
