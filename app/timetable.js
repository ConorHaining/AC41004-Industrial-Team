const data = require('./timetableData');
const ejs = require('ejs');
const path = require('path');

/**
 * Taken from: https://stackoverflow.com/a/6117889
 */
Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

module.exports = {
    getTimetableByRoom: function(room) {
        return data[room];
    },

    getTimetableByRoomToday: function(room, cb) {
        const roomTimetable = data[room];

        const dayAsNumber = new Date().getDay();
        const weekAsNumber = new Date().getWeekNumber() - 36; // 36 allows for the mapping of uni weeks to year weeks

        let todaysTimetable = roomTimetable
                            .filter(record => record.day === dayAsNumber)
                            .filter(record => record.week.includes(weekAsNumber))
                            .map(record => {
                                record.start = this.formatTime(record.start);
                                record.end = this.formatTime(record.end);

                                return record;
                            });

        this.createPopupHtml(room, todaysTimetable, (html) => {
            cb(html);
        });
    },

    formatTime: function(time) {
        if (time >=0 && time < 10){
            return `0${time}:00`;
        } else {
            return `${time}:00`;
        }
    },

    createPopupHtml: function(room, timetable, cb) {
        let data = {roomName: room, timetable: timetable};
        let options = {async: false}

        ejs.renderFile(path.join(__dirname, '../views/timetable.ejs'), data, options, (err, html) => {
            cb(html)
        });
    }
    
}