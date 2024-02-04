const Reservation = require('../src/models/reservation');
const assert = require('assert');
const { faker } = require('@faker-js/faker');
jest.useFakeTimers()

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
    

    test("must save reservation",async ()=>{ 
        console.log(await reservation.save())
    },60000)

})