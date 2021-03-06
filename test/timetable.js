var should = require('chai').should();
var timetable = require('../app/timetable.js');

describe('Timetable Querying', () => {
    it('should return a timetable for a specified room', () => {
        
        let timetableData = timetable.getTimetableByRoom('GroundFloorLabs');

        timetableData.should.be.a('array');

    });

    it('should return a timetable for a specified room for today only', () => {

        timetable.getTimetableByRoomToday('GroundFloorLabs', (html) => {
            html.should.be.a('string');
        });
        
    })
});