const { expect } = require('chai');

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
      beforeEach(() => {
        return truncateTable();
      });

      it('should return zero results', () => {
        return findAll()
          .then((contacts) => {
            expect(contacts.length).to.equal(0);
          })
      });
    });

    context('when table is not empty', () => {
      beforeEach(() => {
        return resetTable();
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
      beforeEach(() => {
        return resetTable();
      });
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
      beforeEach(() => {
        return resetTable();
      });
      it('should return list of contacts that fully or partially match entered string', () => {
        return search('tan')
          .then((contacts) => {
            expect([{ first_name: 'Tanner' }]).to.deep.include.members([{ first_name: 'Tanner' }]);
          });
      });
    });
  });

  describe('create', () => {
    context('when new contact form is submitted', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should save new contact in db', () => {
        return create({
          first_name: 'test',
          last_name: 'tester'
        })
          .then((contact) => {
            expect(contact[0].first_name).to.equal('test');
            expect(contact[0].last_name).to.equal('tester');
          });
      });
    });
  });


  describe('destroy', () => {
    context('when delete button clicked for a contact', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should be deleted from db', () => {
        return destroy(1)
          .then(() => {
            return findAll();
          })
          .then(list => {
            expect(list).to.have.length(2);
          });
      });
    });
  });

}); //end of most outer describe
