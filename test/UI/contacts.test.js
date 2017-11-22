const path = require('path');
const Nightmare = require('nightmare');
const nightmare = Nightmare();
const {expect} = require('chai');

describe('Nightmare tests', function () {

  this.timeout(15000);

  const url = 'http://localhost:3000';

  describe('home page', function () {
    it('should get title of the home page', function (done) {
      nightmare
        .goto(url)
        .evaluate(() => {
          return document.title;
        })
        .end()
        .then(title => {
          expect(title).to.equal('Contacts');
          done();
        });
    });
  });

  describe('contacts home page', function () {
    it('should render all contacts', function (done) {
      nightmare
        .goto(url)
        .evaluate(() => {
          return document.getElementsByClassName('contact-list-member');
        })
        .end()
        .then(list => {
          // expect(list).to.have.lengthOf(3);
          expect(list).to.exist;
          done();
        });
    });
  });



  describe('new contact form page', function () {
    it('should render form to create new contact', function (done) {
      nightmare
        .goto(`${url}/contacts/new`)
        .evaluate(() => {
          return document.getElementById('new');
        })
        .end()
        .then(form => {
          expect(form).to.exist;
          done();
        });
    });
  });

  describe('sending form', function () {
    it('should redirect and render created contact', function (done) {
      nightmare
        .goto(`${url}/contacts/new`)
        .type('input[name="first_name"]','bob')
        .type('input[name="last_name"]','ross')
        .click('input[type="submit"]')
        .wait(5000) //'.contact-show-page-controls'
        .evaluate(() => {
          return document.getElementsByTagName('h1')[0];
        })
        .end()
        .then(contact => {
          expect(contact.innerText).to.equal('bob ross');
          done();
        });
    });
  });

}); //end of most outer describe
