const sinon = require('sinon');
const TaskController = require('../../controllers/v1/task-controller');

describe('viewAllTasks', () => {

    // Returns all tasks created by a user
    it('should return all tasks created by a user when username is provided', async () => {
      const req = {
        params: {
          username: 'testUser'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const user = {
        username: 'testUser'
      };
      const tasks = [
        { title: 'Task 1', description: 'Description 1', createdBy: 'testUser', completed: false },
        { title: 'Task 2', description: 'Description 2', createdBy: 'testUser', completed: true }
      ];
      sinon.stub(UserModel, 'findOne').resolves(user);
      sinon.stub(TaskModel, 'find').resolves(tasks);

      await TaskController.viewAllTasks(req, res);

      sinon.assert.calledWith(res.json, tasks);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);

      UserModel.findOne.restore();
      TaskModel.find.restore();
    });

    // Returns 200 status code
    it('should return 200 status code when username is provided', async () => {
      const req = {
        params: {
          username: 'testUser'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const user = {
        username: 'testUser'
      };
      const tasks = [
        { title: 'Task 1', description: 'Description 1', createdBy: 'testUser', completed: false },
        { title: 'Task 2', description: 'Description 2', createdBy: 'testUser', completed: true }
      ];
      sinon.stub(UserModel, 'findOne').resolves(user);
      sinon.stub(TaskModel, 'find').resolves(tasks);

      await TaskController.viewAllTasks(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);

      UserModel.findOne.restore();
      TaskModel.find.restore();
    });

    // Returns 400 status code if username is missing
    it('should return 400 status code when username is missing', async () => {
      const req = {
        params: {}
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await TaskController.viewAllTasks(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { error: "Missing required fields" });
    });

    // Returns 404 status code if user is not found
    it('should return 404 status code when user is not found', async () => {
      const req = {
        params: {
          username: 'testUser'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      sinon.stub(UserModel, 'findOne').resolves(null);

      await TaskController.viewAllTasks(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { error: "User not found" });

      UserModel.findOne.restore();
    });
});