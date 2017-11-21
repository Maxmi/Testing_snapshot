const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { resetTable } = require('../helpers/db');
const app = require('../../src/server');

const router = require('../../src/server/routes');

const {
  errorHandler,
  logErrors,
  notFoundHandler,
  setDefaultResponseLocals,
} = require('../../src/server/middlewares');

const { renderError } = require('../../src/server/utils');

const {
  create,
  findById,
  findAll,
  destroy,
  search,
} = require('../../src/models/db/contacts');


chai.use(chaiHttp);

describe.only('routes', () => {

  describe('/GET all contacts', () => {
    context('when user hits / route', () => {
      it('should render a page with all contacts', () => {
        return chai.request(app)
          .get('/')
          .end((res) => {
            expect(res).to.have.status(200);
          });
      });
    });
  });

  describe('/GET new contact', () => {
    context('when user hits /new route', () => {
      it('should render a page with new contact form', () => {
        return chai.request(app)
          .get('/contacts/new')
          .end((res) => {
            expect(res).to.have.status(200);
          });
      });
    });
  });

  describe('/POST new contact', () => {
    context('when form for new contact is submitted', () => {
      it('should be saved in db and rendered on the page', () => {
        return chai.request(app)
          .post('/contacts')
          .set('content-type', 'application/x-www-form-urlencoded')
          .type('form')
          .send({
            first_name: 'bob',
            last_name: 'ross',
          })
          .end((res) => {
            expect(res).to.have.status(200);
            expect(res.bodyParser).to.be.a('object');
          });
      });
    });

    context('when one field of the form is empty', () => {
      it('should NOT be submitted and error message should rendered on the page', () => {
        return chai.request(app)
          .post('/contacts')
          .set('content-type', 'application/x-www-form-urlencoded')
          .type('form')
          .send({
            first_name: 'bob',
            last_name: '',
          })
          .end((res) => {
            expect(res).to.have.status(304);
            expect(res.text).to.contain('Last name cannot be blank');
          });
      });
    });

  });

  // describe('/GET contact by id', () => {
  //   context('when user hits route /contacts/1', () => {
  //     it('should display contact with id 1 on the page', () => {
  //       return chai.request(app)
  //       .get('/contacts/1')
  //       .then(res => {
  //         // expect(res).to.be.a('');
  //       })
  //     });
  //   });
  // });

  // describe('/DELETE contact by id', () => {
  //   context('when delete button in front of a contact clicked', () => {
  //     it('should delete this contact from db', () => {
  //       return chai.request(app)
  //       .delete('/contacts/1')
  //       .then(res => {
  //         // expect(res).to.be.a('');
  //       })
  //     });
  //   });
  // });

  // describe('/GET search', () => {
  //   context('when a string is entered into search field', () => {
  //     it('should return contacts matching this string from db and display on the page', () => {
  //       const searchTerm = 'test'
  //       return chai.request(app)
  //       .get(`/contacts/search?q=${searchTerm}`)
  //       .then(res => {
  //         // expect(res).to.be.a('');
  //       })
  //     });
  //   });
  // });


});
//end of most outer describe
