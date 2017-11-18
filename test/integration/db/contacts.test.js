// const db = require('./db');
const expect = require('chai').expect;
const pg = require('pg-promise')();

const {
  create,
  findById,
  findAll,
  destroy,
  search,
} = require('../../../src/models/db/contacts');

const { resetTable } = require('../../helpers/db');


describe('database queries', () => {
  // run this test while db is empty
  describe('findAll', () => {
    context('when table is empty', () => {
      it('should return zero results', () => {
        // no need to use done(), just put return before function call
        return findAll()
          .then((contacts) => {
            expect(contacts.length).to.equal(0);
            // done();
          })
      });
    });
    context('when table is not empty', () => {
      //use this for all other tests - do I need to add it into each context?
      beforeEach(() => {
        return resetTable()
      });
      it('should return all contacts', () => {
        return findAll()
          .then((contacts) => {
            expect(contacts.length).to.be.above(0);
          });
      });
    });
  });


  describe('findById', () => {
    context('when contact id is provided in search field', () => {
      it('should return a contact with given id', () => {
        return findById(1)
          .then((contact) => {
            // expect(contact).to.be.true;
            expect(contact.first_name).to.equal('Jared');
            expect(contact.last_name).to.equal('Grippe');
          });
      });
    });
  });

/*
  describe('search', () => {
    context('when contact name is typed in search field', () => {
      it('should return that contact', () => {
        return search('Jared Gripper')
          .then((contact) => {
            // expect(contact).to.be.ok;
          });
      });
    });
  });


  describe('create', () => {
    context('when form is filled and submitted', () => {
      it('should save contact in db', () => {
        return create('Test Tester')
          .then((contact) => {
            // expect('Test Tester').to.exist;
            expect(contact.id).to.equal(4);
          });
      });
    });
  });


  describe('destroy', () => {
    context('when delete button clicked for a contact', () => {
      it('should be deleted from db', () => {
        return destroy('Test Tester')
          .then((contact) => {
            expect(contact).to.be.null;
          });
      });
    });
  });


*/

}); //end of most outer describe
