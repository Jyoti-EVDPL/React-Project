var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('My test 02', function () {
    it('value of 2nd index check', function () {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
    it('value of 1st index check', function () {
      assert.equal([1, 2, 3].indexOf(2), 1);
    });
});