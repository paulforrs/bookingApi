const Reservation = require('../src/models/reservation');
const assert = require('assert');
const { faker } = require('@faker-js/faker');
const app = require("../src/index")
const request = require('supertest');
const { ObjectId } = require('mongodb');

describe('Reservation Test', ()=>{
    let reservation
    beforeAll(()=>{
        reservation = new Reservation({
            guest: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName()
            },
            checkInDate: faker.date.soon({ days: faker.number.int({ min: 1, max: 100 })}),
            checkOutDate: faker.date.soon({days: faker.number.int({ min: 1, max: 10 }), refDate: this.checkInDate}),
            numOfGuest: faker.number.int({ min: 1, max: 10 }),
            numOfRooms: faker.number.int({ min: 1, max: 3 }),
            note: faker.lorem.lines({ min: 1, max: 3 })
        });
    })
    afterAll(()=>{
        reservation = null
    })

        
    it('GET /guests --> array of guests',()=>{
        return request(app).get('/api/reservations')
        .expect("Content-Type",/json/)
        .expect(200)
        // .then((res)=>{
        //     expect(res.body).toEqual(
        //         expect.objectContaining({
        //             guest: expect.any(String)
        //         })
        //     )
        //     })
        })
    it('GET /guest/id --> specific guest by ID',()=>{

    })

})