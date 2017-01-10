var _ = require('lodash');
var moment = require('moment');

function getKeys(data) {
    return _.uniqBy(data, 'name').map(function(entry) {
        return entry.name;
    });
}

function addTime(a, b) {
    var durA = moment.duration(a);
    var durB = moment.duration(b);
    var sum = durA.add(durB);
    var hour = Math.floor(sum.asHours());
    var minute = ('00' + sum.minutes()).slice(-2);

    return `${hour}:${minute}`;
}

module.exports = {
    getKeys: getKeys,
    addTime: addTime
};

// (1). get unique key
// 2. read from csv and prase into time string array by key
// 3. reduce time string array by addTime and get total time xxxx:xxx
