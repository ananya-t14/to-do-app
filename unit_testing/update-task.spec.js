const sinon = require('sinon');
const TaskController = require('../../controllers/v1/task-controller');
const UserModel = require('../../models/v1/user.models');
const TaskModel = require('../../models/v1/task.models');

describe('updateTask', () => {

    // Successfully update an existing task
    it('should update an existing task when valid data is provided', async () => {
      // Mock the request parameters and body
      const req = {
        params: { username: 'testuser', title: 'Task 1' },
        body: { title: 'Updated Task 1', description: 'Updated description', status: true }
      };

      // Mock the response object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Mock the UserModel.findOne method
      const findOneStub = sinon.stub(UserModel, 'findOne').resolves({ username: 'testuser' });

      // Mock the TaskModel.findOneAndUpdate method
      const findOneAndUpdateStub = sinon.stub(TaskModel, 'findOneAndUpdate').resolves({ 
        title: 'Updated Task 1',
        description: 'Updated description',
        createdBy: 'testuser',
        completed: true
      });

      // Call the updateTask method
      await TaskController.updateTask(req, res);

      // Assert the response status and json methods were called correctly
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, { 
        title: 'Updated Task 1',
        description: 'Updated description',
        createdBy: 'testuser',
        completed: true
      });

      // Restore the stubbed methods
      findOneStub.restore();
      findOneAndUpdateStub.restore();
    });

    // Return updated task document
    it('should return the updated task document when valid data is provided', async () => {
      // Mock the request parameters and body
      const req = {
        params: { username: 'testuser', title: 'Task 1' },
        body: { title: 'Updated Task 1', description: 'Updated description', status: true }
      };

      // Mock the response object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Mock the UserModel.findOne method
      const findOneStub = sinon.stub(UserModel, 'findOne').resolves({ username: 'testuser' });

      // Mock the TaskModel.findOneAndUpdate method
      const findOneAndUpdateStub = sinon.stub(TaskModel, 'findOneAndUpdate').resolves({ 
        title: 'Updated Task 1',
        description: 'Updated description',
        createdBy: 'testuser',
        completed: true
      });

      // Call the updateTask method
      await TaskController.updateTask(req, res);

      // Assert the response status and json methods were called correctly
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, { 
        title: 'Updated Task 1',
        description: 'Updated description',
        createdBy: 'testuser',
        completed: true
      });

      // Restore the stubbed methods
      findOneStub.restore();
      findOneAndUpdateStub.restore();
    });

    // User not found
    it('should return an error response when user is not found', async () => {
      // Mock the request parameters and body
      const req = {
        params: { username: 'testuser', title: 'Task 1' },
        body: { title: 'Updated Task 1', description: 'Updated description', status: true }
      };

      // Mock the response object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Mock the UserModel.findOne method to return null
      const findOneStub = sinon.stub(UserModel, 'findOne').resolves(null);

      // Call the updateTask method
      await TaskController.updateTask(req, res);

      // Assert the response status and json methods were called correctly
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { error: 'User not found' });

      // Restore the stubbed method
      findOneStub.restore();
    });

    // Task does not exist
    it('should return an error response when task does not exist', async () => {
      // Mock the request parameters and body
      const req = {
        params: { username: 'testuser', title: 'Task 1' },
        body: { title: 'Updated Task 1', description: 'Updated description', status: true }
      };

      // Mock the response object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Mock the UserModel.findOne method
      const findOneStub = sinon.stub(UserModel, 'findOne').resolves({ username: 'testuser' });

      // Mock the TaskModel.findOneAndUpdate method to return null
      const findOneAndUpdateStub = sinon.stub(TaskModel, 'findOneAndUpdate').resolves(null);

      // Call the updateTask method
      await TaskController.updateTask(req, res);

      // Assert the response status and json methods were called correctly
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { error: 'Task does not exist' });

      // Restore the stubbed methods
      findOneStub.restore();
      findOneAndUpdateStub.restore();
    });

    // Missing required fields
    it('should return an error response when required fields are missing', async () => {
      // Mock the request parameters and body with missing username
      const req = {
        params: { title: 'Task 1' },
        body: { title: 'Updated Task 1', description: 'Updated description', status: true }
      };

      // Mock the response object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Call the updateTask method
      await TaskController.updateTask(req, res);

      // Assert the response status and json methods were called correctly
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { error: 'Missing required fields' });
    });

    // Update only specific fields of the task document
    it('should update only specific fields of the task document when valid data is provided', async () => {
      // Mock the request parameters and body
      const req = {
        params: { username: 'testuser', title: 'Task 1' },
        body: { description: 'Updated description' }
      };

      // Mock the response object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Mock the UserModel.findOne method
      const findOneStub = sinon.stub(UserModel, 'findOne').resolves({ username: 'testuser' });

      // Mock the TaskModel.findOneAndUpdate method
      const findOneAndUpdateStub = sinon.stub(TaskModel, 'findOneAndUpdate').resolves({ 
        title: 'Task 1',
        description: 'Updated description',
        createdBy: 'testuser',
        completed: false
      });

      // Call the updateTask method
      await TaskController.updateTask(req, res);

      // Assert the response status and json methods were called correctly
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, { 
        title: 'Task 1',
        description: 'Updated description',
        createdBy: 'testuser',
        completed: false
      });

      // Restore the stubbed methods
      findOneStub.restore();
      findOneAndUpdateStub.restore();
    });
});