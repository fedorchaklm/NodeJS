export const isValidEmail = (email) => {
  const regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  return email.length <= 254 && regexp.test(email);
};

export const isValidPassword = (password) => {
  const regexp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regexp.test(password);
};

export const validateRegisterData = (req, res, next) => {
  const { email, password } = req.body;
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(422).send('Email or password format is invalid');
  }
  return next();
};
