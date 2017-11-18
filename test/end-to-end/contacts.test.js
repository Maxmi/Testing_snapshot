const expect = require('chai').expect;
const dbHelper = require('../helpers/db');

describe('demo', () => {
  beforeEach('reset db', () => {
    return dbHelper.initDB();
  });
  it('should work', () => {
    expect(value).to.equal(value);
    
  });

  it('', () => {
    expect(value).to.equal(value);
  });

  it('', () => {
    expect(value).to.equal(value);
  });

});
