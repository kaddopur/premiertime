const _ = require('lodash');
const moment = require('moment');

function getKeys(data) {
    return _.uniqBy(data, 'name').map(entry => entry.name);
}

function addTime(a, b) {
    const durA = moment.duration(a);
    const durB = moment.duration(b);
    const sum = durA.add(durB);
    const hour = Math.floor(sum.asHours());
    const minute = ('00' + sum.minutes()).slice(-2);

    return `${hour}:${minute}`;
}

module.exports = {
    getKeys: getKeys,
    addTime: addTime
};
