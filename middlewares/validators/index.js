const { userSchema, taskSchema } = require('./schema');

class Validators {
  static async validateUser(req, res, next) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      next();
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async validateTask(req, res, next) {
    try {
      const { error } = taskSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      next();
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = Validators;
