const userModel = require('../../models/v2/user.models');
const { hash } = require('../../utils/auth');

class UserController {
  static async createUser(req, res) {
    try {
      const {
        name, username, password, email,
      } = req.body;
      if (!name || !username || !password || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const user = await userModel.findOne({ where: { email } });
      if (user) {
        return res.status(404).json({ error: 'User already exists' });
      }
      const hashedPassword = await hash(password);
      await userModel.create({
        name,
        username,
        password: hashedPassword,
        email,
      });
      return res.status(200).json({ message: `Created user having ${email}` });
    } catch (e) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  static async getUser(req, res) {
    try {
      const { username } = req.params;
      const user = await userModel.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res
        .status(200)
        .json({ message: `Details for ${username}`, data: user });
    } catch (e) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  static async updateUser(req, res) {
    try {
      const { username } = req.params.username;
      const updatedData = req.body;
      const [rowsAffected, [updatedUser]] = await userModel.update(updatedData, {
        where: { username },
        returning: true,
      });
      if (rowsAffected === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { username } = req.params;
      const rowsAffected = await userModel.destroy({ where: { username } });
      if (rowsAffected === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json({ message: `User ${username} deleted successfully` });
    } catch (e) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
}

module.exports = UserController;
