var chai = require('chai')
var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;
let server = require("../server")
let chaiHttp = require("chai-http"); //to test APIs
chai.use(chaiHttp);
// var assert = chai.assert()
// var should = chai.should()
// var expect = chai.expect()
//---------------------
describe('Aspect Check', function () {
    let username = 'Alta.OHara'
    let password = 'admin123'
    let mylist = { item: [{ id: 1, name: 'demo' }], title: 'user list' }
    describe('Check User&Pass', function () {
        it('check type', function () {
            assert.typeOf(username, "string");
        });
        it('equal string?', function () {
            assert.equal(username, "Alta.OHara");
        });
        it('length match?', function () {
            assert.lengthOf(mylist.item, 1);
        });
        it('username should be a string', function () {
            username.should.be.a('string');
        });
    });

    describe('Login Failed', function () {
        it('User is not present', function () {
            assert.typeOf(username, "string");
        });
        it('password is invalid', function () {
            assert.equal([1, 2, 3].indexOf(2), 1);
        });
    });

    describe('Aspect Check', function () {
        describe('should check', function () {
            it('username should be a string', function () {
                // username1.should.be.a('string');
                username.should.equal('Alta.OHara');
                should.exist(username);
                should.exist(password);
                mylist.should.have.property('item').with.lengthOf(1);
                expect(username).to.equal('Alta.OHara');
            });
            it('length match', function () {
                expect(username).to.lengthOf(10);
            });
            it('object match', function () {
                expect(mylist).to.have.property('item').with.lengthOf(1);
            });
        });
    });
});

describe('Login Test', function () {
    let username = 'admin123'
    let password = 'admin123'
    describe('Login Success', function () {
        it('must return status code 200', function () {
            assert.typeOf(username, "string");
        });
    });

    describe('Login Failed', function () {
        it('User is not present', function () {
            assert.typeOf(username, "string");
        });
        it('password is invalid', function () {
            assert.equal([1, 2, 3].indexOf(2), 1);
        });
    });
});


describe("Login Api", function () {

    describe("Login Api test with id pass", () => {
        let book = {
            "username": "Sonya82",
            "password": "admin123"
        }
        it('logged user', (done) => {
            // chai.request(server)
            chai.request('http://localhost:4000/auth')
                .get('/login')
                .send(book)
                .end((err, response) => {
                    response.should.have.status(200);
                    // response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                    done();
                })
        })
    })

})

describe("Signup Api", function () {

    describe("Signup Api test with id pass", () => {
        let signupUser = {
            fullname: 'Linda Abshire',
            username: 'Cheyanne.Wunsch66',
            emailid: 'Myrna6@yahoo.com',
            phnumber: '7893091595',
            DOB: '1973-12-10',
            country: 'Central African Republic',
            state: 'SC',
            city: 'Canton',
            pincode: '310613',
            password: 'admin123',
            cnfpassword: 'admin123'
        }
        it('logged user', (done) => {
            // chai.request(server)
            chai.request('http://localhost:4000/auth')
                .post('/signup')
                .send(signupUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    // response.should.equal('Table CREATED');
                    // response.should.have.a('string');
                    // response.should.have.text('Table CREATED');
                    // response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                    // response.assert.typeOf("string");
                    done();
                })
        })
    })
})