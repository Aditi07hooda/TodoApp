import zod from "zod";

const validateCreateTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const validateUpdateTodo = zod.object({
  _id: zod.string(),
});

const validateRegisterUser = zod.object({
  username: zod.string().min(3),
  emailId: zod.string().email(),
  password: zod.string().min(6),
});

const validateLoginUser = zod.object({
  emailId: zod.string().email(),
  password: zod.string().min(6),
});

export {
  validateCreateTodo,
  validateUpdateTodo,
  validateLoginUser,
  validateRegisterUser,
};
