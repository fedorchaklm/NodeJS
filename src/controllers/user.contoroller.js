import * as userService from "../services/user.service.js";

export const signUp = (req, res) => {
  const { id, name, email, ...rest } = userService.registerNewUser(req.body);
  res.status(200).json({ id, name, email });
};
