const data = require('./timetableData');

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

    getTimetableByRoomToday: function(room) {
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

        return todaysTimetable;
    },

    formatTime: function(time) {
        if (time >=0 && time < 10){
            return `0${time}:00`;
        } else {
            return `${time}:00`;
        }
        // return 'x';
    }
    
}