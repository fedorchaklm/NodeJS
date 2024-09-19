export const isValidEmail = (email) => {
  const regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  return email.length <= 254 && regexp.test(email);
};

export const isValidPassword = (password) => {
  const regexp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regexp.test(password);
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.status(422).send("Email format is invalid");
  }
  return next();
};

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!isValidPassword(password)) {
    return res.status(422).send("Password format is invalid");
  }
  return next();
};
