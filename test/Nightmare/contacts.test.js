const path = require('path');
const Nightmare = require('nightmare');
const {expect} = require('chai');

describe('Nightmare tests', function () {

  this.timeout(15000);

  const url = 'http://localhost:3000';

  beforeEach(() => {
    nightmare = new Nightmare();
  });

  describe('home page title', function () {
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
        })
        .catch(done);
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
          expect(list).to.exist;
          done();
        })
        .catch(done);

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
        })
        .catch(done);
    });
  });

  describe('sending form', function () {
    it('should redirect and render created contact', function (done) {
      nightmare
        .goto(`${url}/contacts/new`)
        .type('input[name="first_name"]','test')
        .type('input[name="last_name"]','tester')
        .click('#addContact') //added Id into html
        .wait(5000)
        .evaluate(() => {
          return document.querySelectorAll('.page-column-content > h1')[0].innerHTML;
        })
        .end()
        .then(result => {
          expect(result).to.equal('test&nbsp;tester');
          done();
        })
        .catch(done);
    });
  });

  describe('deleting contact', function () {

    it('should delete the contact and redirect to contacts page', function (done) {
        nightmare
        .goto(`${url}/contacts/new`)
        .type('input[name="first_name"]','test')
        .type('input[name="last_name"]','tester')
        .click('#addContact') 
        .wait(3000)
        .click('#deleteCont') 
        //finding popup window and cliking OK button
        .on('page', function(type="confirm", message, response) {
          window.__nightmare = {};
          __nightmare.ipc = require('electron').ipcRenderer;
          window.confirm = function(message, defaultResponse) {
            if(message === 'Are you sure you want to delete this contact?')
              return true;
            return defaultResponse;
          }
        })
        .wait(3000)
        .evaluate(() => {
          return document.getElementsByClassName('contact-list');
        })
        .end()
        .then(result => {
          expect(result).to.be.empty;
          done();
        })
        .catch(done);
    });
  });

}); //end of most outer describe
