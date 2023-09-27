const userModel = require('../../models/v1/user.models');
const { hash } = require('../../utils/auth');

class UserController {
  static async addUser(req, res) {
    try {
      const {
        name, username, password, email,
      } = req.body;
      if (!name || !username || !password || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(404).json({ error: 'User already exists' });
      }
      const hashedpassword = await hash(password);
      await userModel.create({
        name,
        username,
        password: hashedpassword,
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
      if (!username) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const user = await userModel.findOne({ username });
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
      const { username } = req.params;
      if (!username) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const updatedData = req.body;
      const updatedDocument = await userModel.findOneAndUpdate(
        { username },
        updatedData,
        { new: true },
      );
      if (!updatedDocument) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(updatedDocument);
    } catch (e) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

  static async deletedUser(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const deletedUser = await userModel.findOneAndDelete({ username });
      if (!deletedUser) {
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
