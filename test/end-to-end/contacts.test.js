const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const {resetTable} = require('../helpers/db');
const app = require('../../src/server');

const router = require('../../src/server/routes');

// const { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals } = require('../../src/server/middlewares');

// const {renderError} = require('../../src/server/utils');

// const {create, findById, findAll, destroy, search} = require('../../src/models/db/contacts');

describe('routes', () => {

  //run while db is empty
  describe('/GET all contacts', () => {

    context('when db is empty', () => {
      it('should render an empty page', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        });
      });
    });

    context('when db is not empty', () => {
      beforeEach(() => {
        return resetTable()
      });
      it('should render all contacts', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  }); //describe GET all

  describe('/GET new contact', () => {
    it('should render a page with new contact form', (done) => {
      chai.request(app)
      .get('/contacts/new')
      .then((res) => {
        expect(res).to.be.html;
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe.only('/POST new contact', () => {

    context('when form is submitted with all inputs filled', () => {
      it('should create new contact and render it on the page', (done) => {
         chai.request(app)
        .post('/contacts')
        .type('form')
        .send({first_name: 'bob', last_name: 'ross'})
        .then((res) => {
          expect(res).to.redirect;
          expect(res).to.have.status(200);
          // expect(res).to.be.a('object');
          done();
        });
      });
    });

    // better to test non existing route
  }); //describe POST

  describe('/GET/:contacts/1', () => {
    it('should display contact with id 1 on the page', () => {
      return chai.request(app)
      .get('/contacts/1')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
      })
    });
  });

  describe('/DELETE/:contacts/2', () => {
      it('should delete contact with id 2', () => {
        return chai.request(app)
        .delete('/contacts/2')
        .then(res => {
            expect(res).to.have.status(200);
        })
      });
  });

  describe('/GET search', () => {
    it('should return contacts matching search string if they exist', () => {
      return chai.request(app)
        .get('/contacts/search?q=te')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
        });
    });
  });

});
// end of most outer describe
