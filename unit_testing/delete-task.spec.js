/* eslint-disable no-unused-vars */
const { expect } = require('chai').expect;
const mocha = require('mocha');
const TaskController = require('../controllers/v1/task-controller');

mocha.describe('deleteTask', () => {
  // Deletes existing task and returns success message
  mocha.it('should delete task and return success message when task exists', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTask',
      },
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        return data;
      },
    };
    const UserModel = {
      findOne() {
        return Promise.resolve({ username: 'testUser' });
      },
    };
    const TaskModel = {
      findOne() {
        return Promise.resolve({ createdBy: 'testUser', title: 'testTask' });
      },
      findOneAndDelete() {
        return Promise.resolve();
      },
    };

    const result = await TaskController.deleteTask(req, res);

    expect(result).to.deep.equal({ message: 'Task deleted successfully' });
  });

  // Returns 404 if task exists but not created by user
  mocha.it('should return 404 if task exists but not created by user', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTask',
      },
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        return data;
      },
    };
    const UserModel = {
      findOne() {
        return Promise.resolve({ username: 'otherUser' });
      },
    };
    const TaskModel = {
      findOne() {
        return Promise.resolve({ createdBy: 'otherUser', title: 'testTask' });
      },
    };

    const result = await TaskController.deleteTask(req, res);

    expect(result).to.deep.equal({ error: 'Task not found' });
  });

  // Returns 404 if task does not exist
  mocha.it('should return 404 if task does not exist', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTask',
      },
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        return data;
      },
    };
    const UserModel = {
      findOne() {
        return Promise.resolve({ username: 'testUser' });
      },
    };
    const TaskModel = {
      findOne() {
        return Promise.resolve(null);
      },
    };

    const result = await TaskController.deleteTask(req, res);

    expect(result).to.deep.equal({ error: 'Task not found' });
  });

  // Returns 400 if username is missing
  mocha.it('should return 400 if username is missing', async () => {
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        return data;
      },
    };

    const result = await TaskController.deleteTask(req, res);

    expect(result).to.deep.equal({ error: 'Missing required fields' });
  });
});
