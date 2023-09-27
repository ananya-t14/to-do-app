const { expect } = require('chai');
const mocha = require('mocha');

const TaskController = require('../controllers/v1/task-controller');

mocha.describe('createTask', () => {
  // Creates a new task with valid input data
  mocha.it('should create a new task when valid input data is provided', () => {
    // Mock the request and response objects
    const req = {
      body: {
        username: 'testUser',
        title: 'Test Task',
        description: 'This is a test task',
        status: 'completed',
      },
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };

    // Call the createTask method
    TaskController.createTask(req, res);

    // Assert the response status code and data
    expect(res.statusCode).to.equal(201);
    expect(res.responseData).to.deep.equal({
      title: 'Test Task',
      description: 'This is a test task',
      createdBy: 'testUser',
      completed: 'completed',
    });
  });

  // Returns a 201 status code and the created task object
  mocha.it('should return a 201 status code and the created task object', () => {
    // Mock the request and response objects
    const req = {
      body: {
        username: 'testUser',
        title: 'Test Task',
        description: 'This is a test task',
        status: 'completed',
      },
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };

    // Call the createTask method
    TaskController.createTask(req, res);

    // Assert the response status code and data
    expect(res.statusCode).to.equal(201);
    expect(res.responseData).to.deep.equal({
      title: 'Test Task',
      description: 'This is a test task',
      createdBy: 'testUser',
      completed: 'completed',
    });
  });

  // Returns a 500 status code and an error message if there is an error creating the task
  mocha.it('should return a 500 status code and an error message if there is an error creating the task', () => {
    // Mock the request and response objects
    const req = {
      body: {
        username: 'testUser',
        title: 'Test Task',
        description: 'This is a test task',
        status: 'completed',
      },
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };

    // Mock the TaskModel.create method to throw an error
    TaskController.create = () => {
      throw new Error('Error creating task');
    };

    // Call the createTask method
    TaskController.createTask(req, res);

    // Assert the response status code and error message
    expect(res.statusCode).to.equal(500);
    expect(res.responseData).to.deep.equal({ error: 'Error creating task' });
  });

  // Returns a 400 status code and an error message if required fields are missing from request body
  mocha.it('should return a 400 status code and an error message if required fields are missing from the request body', () => {
    // Mock the request and response objects
    const req = {
      body: {},
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };

    // Call the createTask method
    TaskController.createTask(req, res);

    // Assert the response status code and error message
    expect(res.statusCode).to.equal(400);
    expect(res.responseData).to.deep.equal({ error: 'Missing required fields' });
  });
});
