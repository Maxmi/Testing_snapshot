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

const { truncateTable, resetTable } = require('../../helpers/db');


describe('database queries', () => {

  describe('findAll', () => {
    context('when table is empty', () => {
      it('should return zero results', () => {
        return findAll()
          .then((contacts) => {
            expect(contacts.length).to.equal(0);
          })
      });
    });

    context('when table is not empty', () => {
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
            expect(contact.first_name).to.equal('Jared');
            expect(contact.last_name).to.equal('Grippe');
          });
      });
    });
  });


  describe('search', () => {
    context('when a string is typed in search field', () => {
      it('should return list of contacts that fully or partially match entered string', () => {
        return search('tan')
          .then((contacts) => {
            expect([{ first_name: 'Tanner' }]).to.deep.include.members([{ first_name: 'Tanner' }]);
          });
      });
    });
  });





  describe('create', () => {
    context('when form is filled and submitted', () => {
      it('should save new contact in db', () => {
        return create(('Test', 'Tester'))
          .then((contact) => {
            expect(contact.id).to.equal(4);
          });
      });
    });
  });


  describe('destroy', () => {
    context('when delete button clicked for a contact', () => {
      it('should be deleted from db', () => {
        return destroy(1)
          .then((contact) => {
            expect(contact.id).to.equal(undefined);
          });
      });
    });
  });

}); //end of most outer describe
