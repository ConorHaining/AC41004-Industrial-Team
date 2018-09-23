var should = require('chai').should();
var desks = require('../app/desks.js');

describe('Desk Availability', () => {
    it('should return an object of desks being used', () => {
        
        desks.getCurrentDeskUsage((deskAvailability) => {
            deskAvailability.should.be.an('object');
        });


    });

    it('should contain either true/false as values', () => {

        desks.getCurrentDeskUsage((deskAvailability) => {
            let values = Object.values(deskAvailability);
    
            values.forEach(element => {
                element.should.be.a('boolean');
            });
        });


    });
});