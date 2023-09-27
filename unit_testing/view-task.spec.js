/* eslint-disable no-unused-vars */
const sinon = require('sinon');
const mocha = require('mocha');
const TaskController = require('../controllers/v1/task-controller');

mocha.describe('viewTaskByTitle', () => {
  // Returns the task with the given title for the specified user
  mocha.it('should return the task with the given title for the specified user', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTitle',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const user = {
      username: 'testUser',
    };
    const task = {
      createdBy: 'testUser',
      title: 'testTitle',
      description: 'testDescription',
      completed: false,
    };
    const UserModel = {
      findOne: sinon.stub().resolves(user),
    };
    const TaskModel = {
      findOne: sinon.stub().resolves(task),
    };

    await TaskController.viewTaskByTitle(req, res);

    sinon.assert.calledWith(res.json, task);
  });

  // Returns 200 status code
  mocha.it('should return 200 status code', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTitle',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const user = {
      username: 'testUser',
    };
    const task = {
      createdBy: 'testUser',
      title: 'testTitle',
      description: 'testDescription',
      completed: false,
    };
    const UserModel = {
      findOne: sinon.stub().resolves(user),
    };
    const TaskModel = {
      findOne: sinon.stub().resolves(task),
    };

    await TaskController.viewTaskByTitle(req, res);

    sinon.assert.calledWith(res.status, 200);
  });

  // Returns 400 status code if username is missing
  mocha.it('should return 400 status code if username is missing', async () => {
    const req = {
      params: {
        title: 'testTitle',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await TaskController.viewTaskByTitle(req, res);

    sinon.assert.calledWith(res.status, 400);
  });

  // Returns 404 status code if user is not found
  mocha.it('should return 404 status code if user is not found', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTitle',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const UserModel = {
      findOne: sinon.stub().resolves(null),
    };

    await TaskController.viewTaskByTitle(req, res);

    sinon.assert.calledWith(res.status, 404);
  });

  // Returns 404 status code if task with given title does not exist for the user
  mocha.it('should return 404 status code if task with given title does not exist for the user', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTitle',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const user = {
      username: 'testUser',
    };
    const TaskModel = {
      findOne: sinon.stub().resolves(null),
    };

    await TaskController.viewTaskByTitle(req, res);

    sinon.assert.calledWith(res.status, 404);
  });

  // Returns 500 status code if there is an error fetching task
  mocha.it('should return 500 status code if there is an error fetching task', async () => {
    const req = {
      params: {
        username: 'testUser',
        title: 'testTitle',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const user = {
      username: 'testUser',
    };
    const UserModel = {
      findOne: sinon.stub().resolves(user),
    };
    const TaskModel = {
      findOne: sinon.stub().rejects(new Error('Database error')),
    };

    await TaskController.viewTaskByTitle(req, res);

    sinon.assert.calledWith(res.status, 500);
  });
});
