const sinon = require('sinon');
const chai = require('chai');

describe('createPayload', () => {

    // Returns an object with title, description, createdBy and completed fields
    it('should return an object with title, description, createdBy and completed fields', () => {
      const data = {
        title: 'Task 1',
        description: 'Description 1',
        username: 'user1',
        status: true
      };
      const expectedPayload = {
        title: 'Task 1',
        description: 'Description 1',
        createdBy: 'user1',
        completed: true
      };
      const payload = createPayload(data);
      expect(payload).to.deep.equal(expectedPayload);
    });

    // Returns an object with correct title, description, createdBy and completed values
    it('should return an object with correct title, description, createdBy and completed values', () => {
      const data = {
        title: 'Task 2',
        description: 'Description 2',
        username: 'user2',
        status: false
      };
      const expectedPayload = {
        title: 'Task 2',
        description: 'Description 2',
        createdBy: 'user2',
        completed: false
      };
      const payload = createPayload(data);
      expect(payload).to.deep.equal(expectedPayload);
    });

    // Returns an object with correct title, description, createdBy and completed values when given additional fields
    it('should return an object with correct title, description, createdBy and completed values when given additional fields', () => {
      const data = {
        title: 'Task 3',
        description: 'Description 3',
        username: 'user3',
        status: true,
        additionalField: 'Additional Field'
      };
      const expectedPayload = {
        title: 'Task 3',
        description: 'Description 3',
        createdBy: 'user3',
        completed: true
      };
      const payload = createPayload(data);
      expect(payload).to.deep.equal(expectedPayload);
    });

    // Returns an object with empty strings for title, description, createdBy and completed fields when given an empty object
    it('should return an object with empty strings for title, description, createdBy and completed fields when given an empty object', () => {
      const data = {};
      const expectedPayload = {
        title: '',
        description: '',
        createdBy: '',
        completed: ''
      };
      const payload = createPayload(data);
      expect(payload).to.deep.equal(expectedPayload);
    });

    // Returns an object with empty strings for title, description, createdBy and completed fields when given an object with missing fields
    it('should return an object with empty strings for title, description, createdBy and completed fields when given an object with missing fields', () => {
      const data = {
        title: 'Task 5',
        username: 'user5'
      };
      const expectedPayload = {
        title: 'Task 5',
        description: '',
        createdBy: 'user5',
        completed: ''
      };
      const payload = createPayload(data);
      expect(payload).to.deep.equal(expectedPayload);
    });

    // Returns an object with correct title, description, createdBy and completed values when given an object with extra fields
    it('should return an object with correct title, description, createdBy and completed values when given an object with extra fields', () => {
      const data = {
        title: 'Task 6',
        description: 'Description 6',
        username: 'user6',
        status: false,
        extraField: 'Extra Field'
      };
      const expectedPayload = {
        title: 'Task 6',
        description: 'Description 6',
        createdBy: 'user6',
        completed: false
      };
      const payload = createPayload(data);
      expect(payload).to.deep.equal(expectedPayload);
    });
});