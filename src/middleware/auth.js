const adminAuth = (req, res, next) => {
  const authToken = "xyz";
  const isAuthorized = authToken === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Not authorized as Admin");
  } else {
    console.log("Authorized as admin");
    next();
  }
};

const userAuth = (req, res, next) => {
  const authToken = "xyz";
  const isAuthorized = authToken === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Not authorized as User");
  } else {
    console.log("Authorized as user");
    next();
  }
};

module.exports = { adminAuth, userAuth };
