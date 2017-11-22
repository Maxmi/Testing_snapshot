const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const {resetTable} = require('../helpers/db');
const app = require('../../src/server');

describe('routes', () => {

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
  });

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

  describe('/POST new contact', () => {
    context('when form is submitted with all inputs filled', () => {
      it('should create new contact and render it on the page', (done) => {
        chai.request(app)
        .post('/contacts')
        .type('form')
        .send({first_name: 'bob', last_name: 'ross'})
        .then((res) => {
          expect(res).to.redirect;
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  // describe.only('/GET non-existing route', () => {
  //     it('should render Page Not found', (done) => {
  //       chai.request(app)
  //       .get('/hello')
  //       .then((res) => {
  //         // expect(res).to.be.html;
  //         expect(res).to.have.status(404);
  //         done();
  //       });
  //   });
  // });

  describe('/GET/:contacts/1', () => {
    beforeEach(() => {
      return resetTable()
    });
    it('should display contact with id 1 on the page', (done) => {
      chai.request(app)
      .get('/contacts/1')
      .then(res => {
        expect(res).to.be.html;
        expect(res).to.have.status(200);
        done();
      })
    });
  });

  describe('/DELETE/:contacts/1', () => {
      it('should delete contact with id 1', (done) => {
        chai.request(app)
        .delete('/contacts/1')
        .then(res => {
            expect(res).to.redirect;
            expect(res).to.be.html;
            expect(res).to.have.status(200);
            done();
        })
      });
  });

  describe('/GET search', () => {
    beforeEach(() => {
      return resetTable()
    });
    it('should return contacts matching search string if they exist', (done) => {
      chai.request(app)
        .get('/contacts/search?q=t')
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

});
// end of most outer describe
