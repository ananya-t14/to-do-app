import { userSchema, taskSchema } from "./schema";

class Validators {
  static async validateUser(req, res, next) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      next();
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async validateTask(req, res, next) {
    try {
      const { error } = taskSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      next();
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Validators;
