const Guest = require('../models/guest');
const assert = require('assert');
const { faker } = require('@faker-js/faker');

describe("Test guests",()=>{

    beforeAll(()=>{
        mockGuestData =  {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        }
    })
        
    it('GET /guests --> array of guests',()=>{

    })
})